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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedGuests = formData.map(guest => ({
        ...guest,
        busTime: guest.coming ? guest.busTime : 'none' // Reset bus time if not coming
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

  const allGuestsResponded = guestGroup.guests.every(guest => guest.coming !== undefined);

  if (allGuestsResponded) {
    const atLeastOneComing = guestGroup.guests.some(guest => guest.coming);
    
    return (
      <div className="flex flex-col sm:mx-0">
        <div className="relative mb-6">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
          <div>
            <p className="font-bold">
              {atLeastOneComing 
                ? "We look forward to celebrating with you" 
                : "We are sorry you can't make it"
              }
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ul className="space-y-2">
            {guestGroup.guests.map((guest, index) => (
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
            className="flex-1 bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition-colors text-sm shadow"
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
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <div>
          <h1 className="text-2xl font-bold">Dear {guestGroup.groupInvite},</h1>
          <p className="text-lg text-gray-600 mt-1">Will you attend Sara & Gavriel wedding?</p>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-8 flex-1 overflow-y-auto">
        {formData.map((guest, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0">
            <h3 className="text-left mb-4 text-base font-medium">{guest.fullName}</h3>
            
            {/* Coming/Not Coming Selection */}
            <div className="mb-4">
              <div className="bg-gray-100 p-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateGuestStatus(index, true)}
                    className={`flex-1 py-2 px-3 transition-colors text-sm shadow ${
                      guest.coming === true
                        ? 'bg-gray-400 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => updateGuestStatus(index, false)}
                    className={`flex-1 py-2 px-3 transition-colors text-sm shadow ${
                      guest.coming === false
                        ? 'bg-gray-400 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Not Attending
                  </button>
                </div>
              </div>
            </div>

            {/* Bus Selection - only show if coming */}
            {guest.coming && (
              <div>
                <h4 className="text-left font-normal mb-3 text-gray-700 text-sm">Shuttle from Tel-Aviv to venue?</h4>
                <div className="bg-gray-100 p-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateBusTime(index, 'none')}
                      className={`flex-1 py-2 px-3 transition-colors text-sm shadow ${
                        guest.busTime === 'none'
                          ? 'bg-gray-400 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      None
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBusTime(index, '16:30')}
                      className={`flex-1 py-2 px-3 transition-colors text-sm shadow ${
                        guest.busTime === '16:30'
                          ? 'bg-gray-400 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      16:30
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBusTime(index, '17:00')}
                      className={`flex-1 py-2 px-3 transition-colors text-sm shadow ${
                        guest.busTime === '17:00'
                          ? 'bg-gray-400 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      17:00
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="bg-gray-100 p-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white text-gray-700 py-2 px-4 hover:bg-gray-50 transition-colors text-sm shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition-colors text-sm shadow"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RSVPForm; 