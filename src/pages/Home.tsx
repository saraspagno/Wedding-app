import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../types/firebase';
import { getAuth, signInAnonymously } from 'firebase/auth';
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
  const [authReady, setAuthReady] = useState(false);
  const [searchParams] = useSearchParams();
  const [guestGroup, setGuestGroup] = useState<GuestGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        setAuthReady(true);
      })
      .catch((error) => {
        console.error('Anonymous sign-in failed', error);
        setError('Could not authenticate with server. Please try again.');
      });
  }, []);

  useEffect(() => {
    if (!authReady) return;
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
  }, [authReady, searchParams]);

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


  return (
    <>
      {/* Fullscreen Loading Overlay */}
      {(loading || !authReady) && (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      )}

      <main className="relative">
        <section
          id="home"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <EnvelopeAnimation guestName={guestGroup?.groupInvite ?? ''} />

          <button
            onClick={handleRSVPClick}
            className="mt-[40px] md:mt-0 text-[#4a3626] border-[2px] border-[#4a3626] font-medium overflow-hidden px-20 py-2 rounded-none hover:bg-[#4a3626] hover:text-[#f5f0e6] active:opacity-75 outline-none duration-300 bg-transparent text-lg tracking-wide uppercase font-sans"
          >
            RSVP
          </button>



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
    </>
  );
};

export default Home; 