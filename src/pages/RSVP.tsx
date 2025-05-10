import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../types/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import EnvelopeAnimation from '../components/EnvelopeAnimation';
import '../style/animation.css';

interface Guest {
  id: string;
  name: string;
  lastName: string;
  numberOfPeople: number;
  peopleComing?: number;
  peopleNeedingBus?: number;
}

const RSVP: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    peopleComing: 0,
    peopleNeedingBus: 0
  });

  useEffect(() => {
    const fetchGuest = async () => {
      const rsvpCode = searchParams.get('code');
      console.log("Found RSVP code: " + rsvpCode)
      if (!rsvpCode) {
        setError('No RSVP code provided');
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'guests'), where('rsvpCode', '==', rsvpCode));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError('Guest not found');
          return;
        }

        const docSnap = querySnapshot.docs[0];
        const guestData = { id: docSnap.id, ...docSnap.data() } as Guest;

        setGuest(guestData);
        setFormData({
          peopleComing: guestData.peopleComing || 0,
          peopleNeedingBus: guestData.peopleNeedingBus || 0
        });

        if (guestData.peopleComing !== undefined) {
          setShowForm(false);
        }
      } catch (err) {
        setError('Error fetching guest information');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guest) return;

    if (formData.peopleComing > guest.numberOfPeople) {
      setError(`Cannot confirm more than ${guest.numberOfPeople} people (invited)`);
      return;
    }

    if (formData.peopleNeedingBus > formData.peopleComing) {
      setError('Bus requests cannot exceed the number of people coming');
      return;
    }

    try {
      await updateDoc(doc(db, 'guests', guest.id), {
        peopleComing: formData.peopleComing,
        peopleNeedingBus: formData.peopleNeedingBus
      });

      setGuest({
        ...guest,
        peopleComing: formData.peopleComing,
        peopleNeedingBus: formData.peopleNeedingBus
      });

      setError(null);
      setShowForm(false);
    } catch (err) {
      setError('Error updating RSVP');
      console.error('Error:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!guest) return <div>Guest not found</div>;

  if (guest.peopleComing !== undefined && !showForm) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg mb-4">Thanks for confirming your presence, {guest.name} {guest.lastName}!</p>
        <div className="bg-gray-50 p-4 rounded mb-4">
          <p className="mb-2"><strong>People Coming:</strong> {guest.peopleComing}</p>
          <p><strong>People Needing Bus:</strong> {guest.peopleNeedingBus}</p>
        </div>
        <p className="text-gray-600">We look forward to celebrating with you!</p>
      </div>
    );
  }

  return (
    <>
      <EnvelopeAnimation guestName={`${guest.name} ${guest.lastName}`} />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">RSVP for {guest.name} {guest.lastName}</h1>
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            RSVP
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of People Coming (max: {guest.numberOfPeople})
              </label>
              <input
                type="number"
                min="0"
                max={guest.numberOfPeople}
                value={formData.peopleComing}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  peopleComing: parseInt(e.target.value) || 0
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of People Needing Bus
              </label>
              <input
                type="number"
                min="0"
                max={formData.peopleComing}
                value={formData.peopleNeedingBus}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  peopleNeedingBus: parseInt(e.target.value) || 0
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Submit RSVP
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default RSVP; 