import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../types/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import EnvelopeAnimation from '../components/EnvelopeAnimation';
import RSVPForm from '../components/RSVPForm';
import DetailsSection from '../components/sections/DetailsSection';
import ScheduleSection from '../components/sections/ScheduleSection';
import GiftSection from '../components/sections/GiftSection';
import ShabbatSection from '../components/sections/ShabbatSection';
import { GuestGroup } from '../types/interfaces';
import '../style/animation.css';
import background from '../assets/background1.jpeg';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [guestGroup, setGuestGroup] = useState<GuestGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  useEffect(() => {
    const fetchGuestGroup = async () => {
      const rsvpCode = searchParams.get('code');
      if (!rsvpCode) {
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'guestGroups'), where('rsvpCode', '==', rsvpCode));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Invalid RSVP code');
          setLoading(false);
          return;
        }

        const docSnap = querySnapshot.docs[0];
        const groupData = { id: docSnap.id, ...docSnap.data() } as GuestGroup;
        setGuestGroup(groupData);
      } catch (err) {
        setError('Error fetching guest group information');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestGroup();
  }, [searchParams]);

  const handleRSVPComplete = (updatedGroup: GuestGroup) => {
    setGuestGroup(updatedGroup);
    setShowRSVPModal(false);
  };

  const handleRSVPClick = () => {
    const rsvpCode = searchParams.get('code');
    if (!rsvpCode) {
      setError('No RSVP code provided, please re-click on the link sent to you by the host.');
      return;
    }
    setShowRSVPModal(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="relative">
      {/* Floating RSVP Button */}
      <div className="fixed top-1/4 left-8 z-10 transform -translate-y-1/2">
        <button
          onClick={handleRSVPClick}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform hover:scale-105"
        >
          RSVP
        </button>
      </div>

      <section
        id="home"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <EnvelopeAnimation guestName={guestGroup?.groupInvite ?? ''} />
        <DetailsSection />
      </section>

      <ScheduleSection />
      <ShabbatSection />
      <GiftSection />

      {/* Error Message Modal */}
      {error && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-20 max-w-md">
          <p className="text-red-600 text-center">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      )}

      {/* RSVP Modal */}
      {showRSVPModal && guestGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <RSVPForm
              guestGroup={guestGroup}
              onRSVPComplete={handleRSVPComplete}
              onClose={() => setShowRSVPModal(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Home; 