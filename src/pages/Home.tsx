import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../types/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import EnvelopeAnimation from '../components/EnvelopeAnimation';
import RSVPForm from '../components/RSVPForm';
import '../style/animation.css';

interface Guest {
  fullName: string;
  coming?: boolean;
  needsBus?: boolean;
}

interface GuestGroup {
  id: string;
  groupInvite: string;
  contact: string;
  rsvpCode?: string;
  guests: Guest[];
}

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [guestGroup, setGuestGroup] = useState<GuestGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <EnvelopeAnimation guestName={guestGroup?.groupInvite ?? ''} />
      {guestGroup && <RSVPForm guestGroup={guestGroup} onRSVPComplete={handleRSVPComplete} />}
    </>
  );
};

export default Home; 