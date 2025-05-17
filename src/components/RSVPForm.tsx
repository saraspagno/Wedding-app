import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../types/firebase';

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

interface RSVPFormProps {
  guestGroup: GuestGroup;
  onRSVPComplete: (updatedGroup: GuestGroup) => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ guestGroup, onRSVPComplete }) => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Guest[]>(
    guestGroup.guests.map(guest => ({
      fullName: guest.fullName,
      coming: guest.coming,
      needsBus: guest.needsBus
    }))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedGuests = formData.map(guest => ({
        ...guest,
        needsBus: guest.coming ? guest.needsBus : false // Reset bus request if not coming
      }));

      await updateDoc(doc(db, 'guestGroups', guestGroup.id), {
        guests: updatedGuests
      });

      const updatedGroup = {
        ...guestGroup,
        guests: updatedGuests
      };

      onRSVPComplete(updatedGroup);
      setError(null);
      setShowForm(false);
    } catch (err) {
      setError('Error updating RSVP');
      console.error('Error:', err);
    }
  };

  const updateGuestStatus = (index: number, coming: boolean) => {
    setFormData(prev => prev.map((guest, i) => 
      i === index ? { ...guest, coming, needsBus: coming ? guest.needsBus : false } : guest
    ));
  };

  const updateBusStatus = (index: number, needsBus: boolean) => {
    setFormData(prev => prev.map((guest, i) => 
      i === index ? { ...guest, needsBus } : guest
    ));
  };

  const allGuestsResponded = guestGroup.guests.every(guest => guest.coming !== undefined);
  const totalComing = guestGroup.guests.filter(guest => guest.coming).length;
  const totalNeedingBus = guestGroup.guests.filter(guest => guest.needsBus).length;

  if (allGuestsResponded && !showForm) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg mb-4">Thanks for confirming your presence, {guestGroup.groupInvite}!</p>
        <div className="bg-gray-50 p-4 rounded mb-4">
          <p className="mb-2"><strong>People Coming:</strong> {totalComing} / {guestGroup.guests.length}</p>
          <p><strong>People Needing Bus:</strong> {totalNeedingBus}</p>
          <div className="mt-4 text-left">
            <h3 className="font-semibold mb-2">Guest Details:</h3>
            <ul className="space-y-2">
              {guestGroup.guests.map((guest, index) => (
                <li key={index} className="text-sm">
                  {guest.fullName}: {guest.coming ? 'Coming' : 'Not Coming'}
                  {guest.coming && guest.needsBus && ' (Needs Bus)'}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-gray-600">We look forward to celebrating with you!</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">RSVP for {guestGroup.groupInvite}</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          RSVP
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.map((guest, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold mb-2">{guest.fullName}</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={guest.coming === true}
                      onChange={() => updateGuestStatus(index, true)}
                      className="mr-2"
                    />
                    Coming
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={guest.coming === false}
                      onChange={() => updateGuestStatus(index, false)}
                      className="mr-2"
                    />
                    Not Coming
                  </label>
                </div>
                {guest.coming && (
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={guest.needsBus || false}
                        onChange={(e) => updateBusStatus(index, e.target.checked)}
                        className="mr-2"
                      />
                      Needs Bus Transportation
                    </label>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Submit RSVP
          </button>
        </form>
      )}
    </div>
  );
};

export default RSVPForm; 