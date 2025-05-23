import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { db } from '../types/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import EnvelopeAnimation from '../components/EnvelopeAnimation';
import RSVPForm from '../components/RSVPForm';
import DetailsSection from '../components/sections/DetailsSection';
import VenueSection from '../components/sections/VenueSection';
import ShuttleSection from '../components/sections/ShuttleSection';
import GiftSection from '../components/sections/GiftSection';
import ShabbatSection from '../components/sections/ShabbatSection';
import { GuestGroup } from '../types/interfaces';
import '../style/animation.css';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
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

  // Handle scroll-based URL updates
  const handleScroll = useCallback(() => {
    const sections = ['hero', 'details', 'shabbat', 'venues', 'shuttles', 'gifts'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    const rsvpCode = searchParams.get('code');

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { top, bottom } = element.getBoundingClientRect();
        const offsetTop = top + window.scrollY;
        const offsetBottom = bottom + window.scrollY;

        if (scrollPosition >= offsetTop && scrollPosition <= offsetBottom) {
          const currentPath = location.pathname.split('/').pop();
          if (currentPath !== section && section !== 'hero') {
            navigate(`/${section}${rsvpCode ? `?code=${rsvpCode}` : ''}`, { replace: true });
          } else if (currentPath !== '' && section === 'hero') {
            navigate(`/${rsvpCode ? `?code=${rsvpCode}` : ''}`, { replace: true });
          }
          break;
        }
      }
    }
  }, [location.pathname, navigate, searchParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

      <section>
      <EnvelopeAnimation guestName={guestGroup?.groupInvite ?? ''} />
      </section>

      <DetailsSection />
      <VenueSection />
      <ShuttleSection />
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