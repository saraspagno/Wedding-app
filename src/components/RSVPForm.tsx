import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../types/firebase';
import { Guest, GuestGroup, BusTime } from '../types/interfaces';

interface RSVPFormProps {
  guestGroup: GuestGroup;
  onRSVPComplete: (updatedGroup: GuestGroup) => void;
  onClose: () => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ guestGroup, onRSVPComplete, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Guest[]>(
    guestGroup.guests.map(guest => ({
      fullName: guest.fullName,
      coming: guest.coming,
      busTime: guest.busTime || 'none'
    }))
  );
  const [localGroup, setLocalGroup] = useState<GuestGroup | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure all guests have responded
    const incompleteGuest = formData.find(guest => guest.coming === undefined);
    if (incompleteGuest) {
      setError('Please complete the form for each of the guests');
      return;
    }

    try {
      const updatedGuests = formData.map(guest => ({
        ...guest,
        busTime: guest.coming ? guest.busTime : 'none'
      }));

      await updateDoc(doc(db, 'guestGroups', guestGroup.id), {
        guests: updatedGuests
      });

      const updatedGroup = {
        ...guestGroup,
        guests: updatedGuests
      };

      onRSVPComplete(updatedGroup);
      setLocalGroup(updatedGroup);
      setError(null);
    } catch (err) {
      setError('Error updating RSVP');
      console.error('Error:', err);
    }
  };

  const updateGuestStatus = (index: number, coming: boolean) => {
    setFormData(prev => prev.map((guest, i) => 
      i === index ? { ...guest, coming, busTime: coming ? guest.busTime : 'none' } : guest
    ));
  };

  const updateBusTime = (index: number, busTime: BusTime) => {
    setFormData(prev => prev.map((guest, i) => 
      i === index ? { ...guest, busTime } : guest
    ));
  };

  const groupToShow = localGroup || guestGroup;
  const allGuestsResponded = groupToShow.guests.every(guest => guest.coming !== undefined);

  if (allGuestsResponded) {
    const atLeastOneComing = groupToShow.guests.some(guest => guest.coming);
    
    return (
      <div className="flex flex-col sm:mx-0 font-bold font-sans tracking-wide">
        <div className="relative mb-6">
          <div>
            <p className="font-cursive font-light text-3xl text-amber-950">
              {atLeastOneComing 
                ? "we look forward to celebrating with you" 
                : "we are sorry you can't make it"
              }
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ul className="space-y-2 text-amber-950">
            {groupToShow.guests.map((guest, index) => (
              <li key={index} className="text-left">
                {guest.fullName}: {guest.coming ? 'Coming' : 'Not Coming'}
                {guest.coming && guest.busTime !== 'none' && ` (Bus at ${guest.busTime})`}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            onClick={onClose}
            className="flex-1 bg-amber-950 text-white py-2 px-4 hover:bg-amber-800 transition-colors text-sm shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:mx-0">
      <div className="relative mb-6">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-amber-950 hover:text-amber-700 text-xl mb-4"
        >
          ✕
        </button>
        <div className="pt-8">
          <h1 className="font-cursive font-medium text-3xl text-amber-950 tracking-wide">Dear {guestGroup.groupInvite},</h1>
          <p className="text-xl tracking-wide text-amber-950 mt-2">Will you attend Sara and Gavriel's wedding?</p>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4 font-regular">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-8 flex-1 overflow-y-auto">
        {formData.map((guest, index) => (
          <div key={index} className="border-b border-amber-200 pb-6 last:border-b-0">
            <h3 className="font-sans text-left mb-4 text-lg tracking-wide text-amber-950">{guest.fullName}</h3>
            
            {/* Coming/Not Coming Selection */}
            <div className="mb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateGuestStatus(index, true)}
                  className={`flex-1 py-2 px-3 transition-colors text-sm font-medium overflow-hidden rounded-none outline-none duration-300 font-sans tracking-wide uppercase shadow-lg ${
                    guest.coming === true
                      ? 'bg-amber-950 text-white border-2 border-amber-950'
                      : 'bg-transparent text-amber-950 border-2 border-amber-950 hover:bg-amber-950 hover:text-white'
                  }`}
                >
                  Attending
                </button>
                <button
                  type="button"
                  onClick={() => updateGuestStatus(index, false)}
                  className={`flex-1 py-2 px-3 transition-colors text-sm font-medium overflow-hidden rounded-none outline-none duration-300 font-sans tracking-wide uppercase shadow-lg ${
                    guest.coming === false
                      ? 'bg-amber-950 text-white border-2 border-amber-950'
                      : 'bg-transparent text-amber-950 border-2 border-amber-950 hover:bg-amber-950 hover:text-white'
                  }`}
                >
                  Not Attending
                </button>
              </div>
            </div>

            {/* Bus Selection - only show if coming */}
            {guest.coming && (
              <div>
                <h4 className="text-left tracking-wide mb-3 text-amber-950 text-sm">Shuttle from Tel-Aviv to venue?</h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateBusTime(index, 'none')}
                    className={`flex-1 py-2 px-3 transition-colors text-sm font-medium overflow-hidden rounded-none outline-none duration-300 font-sans tracking-wide uppercase shadow-lg ${
                      guest.busTime === 'none'
                        ? 'bg-amber-950 text-white border-2 border-amber-950'
                        : 'bg-transparent text-amber-950 border-2 border-amber-950 hover:bg-amber-950 hover:text-white'
                    }`}
                  >
                    None
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBusTime(index, '16:30')}
                    className={`flex-1 py-2 px-3 transition-colors text-sm font-medium overflow-hidden rounded-none outline-none duration-300 font-sans tracking-wide uppercase shadow-lg ${
                      guest.busTime === '16:30'
                        ? 'bg-amber-950 text-white border-2 border-amber-950'
                        : 'bg-transparent text-amber-950 border-2 border-amber-950 hover:bg-amber-950 hover:text-white'
                    }`}
                  >
                    16:30
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBusTime(index, '17:00')}
                    className={`flex-1 py-2 px-3 transition-colors text-sm font-medium overflow-hidden rounded-none outline-none duration-300 font-sans tracking-wide uppercase shadow-lg ${
                      guest.busTime === '17:00'
                        ? 'bg-amber-950 text-white border-2 border-amber-950'
                        : 'bg-transparent text-amber-950 border-2 border-amber-950 hover:bg-amber-950 hover:text-white'
                    }`}
                  >
                    17:00
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-transparent text-amber-950 border-2 border-amber-950 font-medium overflow-hidden px-4 py-2 rounded-none hover:bg-amber-950 hover:text-white active:opacity-75 outline-none duration-300 text-sm tracking-wide uppercase font-sans shadow-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-amber-950 text-white border-2 border-amber-950 font-medium overflow-hidden px-4 py-2 rounded-none hover:bg-amber-800 active:opacity-75 outline-none duration-300 text-sm tracking-wide uppercase font-sans shadow-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RSVPForm; 