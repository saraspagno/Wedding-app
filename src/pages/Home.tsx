import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../types/firebase';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import EnvelopeAnimation from '../components/EnvelopeAnimation';
import Modal from '../components/Modal';
import DetailsSection from '../components/sections/DetailsSection';
import ScheduleSection from '../components/sections/ScheduleSection';
import GiftSection from '../components/sections/GiftSection';
import ShabbatSection from '../components/sections/ShabbatSection';
import { GuestGroup, ModalState } from '../types/interfaces';
import '../style/animation.css';
import background from '../assets/background1.jpeg';
import LoadingOverlay from '../components/LoadingOverlay';
import Footer from '../components/footer/Footer';

const Home: React.FC = () => {
  const [authReady, setAuthReady] = useState(false);
  const [searchParams] = useSearchParams();
  const [guestGroup, setGuestGroup] = useState<GuestGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalState, setModalState] = useState<ModalState>(ModalState.NONE);
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthReady(true);
      } else {
        signInAnonymously(auth)
          .then(() => {
            setAuthReady(true);
          })
          .catch((error) => {
            console.error('Anonymous sign-in failed:', error);
            setError(true);
            setModalState(ModalState.ERROR);
          });
      }
    });

    return () => unsubscribe();
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
          console.error('Invalid RSVP code:', rsvpCode);
          setError(true);
          setModalState(ModalState.ERROR);
          setLoading(false);
          return;
        }

        const docSnap = querySnapshot.docs[0];
        const groupData = { id: docSnap.id, ...docSnap.data() } as GuestGroup;
        setGuestGroup(groupData);
      } catch (err) {
        console.error('Error fetching guest group information:', err);
        setError(true);
        setModalState(ModalState.ERROR);
      } finally {
        setLoading(false);
      }
    };

    fetchGuestGroup();
  }, [authReady, searchParams]);

  const handleRSVPComplete = (updatedGroup: GuestGroup) => {
    setGuestGroup(updatedGroup);
    const atLeastOneComing = updatedGroup.guests.some(guest => guest.coming);
    setModalState(atLeastOneComing ? ModalState.THANK_YOU : ModalState.SORRY);
  };

  const handleRSVPClick = () => {
    const rsvpCode = searchParams.get('code');
    if (!rsvpCode) {
      console.error('No RSVP code provided in URL');
      setError(true);
      setModalState(ModalState.ERROR);
      return;
    }

    if (!guestGroup) {
      console.error('Guest group information not available');
      setError(true);
      setModalState(ModalState.ERROR);
      return;
    }

    const allGuestsResponded = guestGroup.guests.every(guest => guest.coming !== undefined);
    
    if (allGuestsResponded) {
      const atLeastOneComing = guestGroup.guests.some(guest => guest.coming);
      setModalState(atLeastOneComing ? ModalState.THANK_YOU : ModalState.SORRY);
    } else {
      setModalState(ModalState.RSVP);
    }
  };

  const closeModal = () => {
    setModalState(ModalState.NONE);
    setError(false);
  };

  return (
    <>
      {/* Fullscreen Loading Overlay */}
      {(loading || !authReady || !animationReady) && <LoadingOverlay />}

      <main className="relative">
        <section
          id="home"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <EnvelopeAnimation 
            guestName={guestGroup?.groupInvite ?? ''} 
            onReady={() => setAnimationReady(true)}
            loadingComplete={!loading && authReady && animationReady}
          />

          <button
            onClick={handleRSVPClick}
            className="mt-[40px] md:mt-0 text-[#4a3626] border-[2px] border-[#4a3626] font-medium overflow-hidden px-20 py-2 rounded-none hover:bg-[#4a3626] hover:text-[#f5f0e6] active:opacity-75 outline-none duration-300 bg-transparent text-lg tracking-wide uppercase font-sans shadow-lg"
          >
            RSVP
          </button>

          <DetailsSection />
        </section>

        <ScheduleSection />
        <ShabbatSection />
        <GiftSection />

        {/* Modal Component */}
        <Modal
          modalState={modalState}
          error={error}
          guestGroup={guestGroup}
          onClose={closeModal}
          onRSVPComplete={handleRSVPComplete}
        />
      </main>
      <Footer />
    </>
  );
};

export default Home; 