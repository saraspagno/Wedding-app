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
  const totalComing = guestGroup.guests.filter(guest => guest.coming).length;
  const totalNeedingBus = guestGroup.guests.filter(guest => guest.busTime !== 'none').length;
  const bus1630Count = guestGroup.guests.filter(guest => guest.busTime === '16:30').length;
  const bus1700Count = guestGroup.guests.filter(guest => guest.busTime === '17:00').length;

  if (allGuestsResponded) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg mb-4">Thanks for confirming your presence, {guestGroup.groupInvite}!</p>
        <div className="bg-gray-50 p-4 rounded mb-4">
          <p className="mb-2"><strong>People Coming:</strong> {totalComing} / {guestGroup.guests.length}</p>
          <p className="mb-2"><strong>Bus Transportation:</strong> {totalNeedingBus} people</p>
          {totalNeedingBus > 0 && (
            <div className="text-sm text-gray-600">
              <p>Bus at 16:30: {bus1630Count} people</p>
              <p>Bus at 17:00: {bus1700Count} people</p>
            </div>
          )}
          <div className="mt-4 text-left">
            <h3 className="font-semibold mb-2">Guest Details:</h3>
            <ul className="space-y-2">
              {guestGroup.guests.map((guest, index) => (
                <li key={index} className="text-sm">
                  {guest.fullName}: {guest.coming ? 'Coming' : 'Not Coming'}
                  {guest.coming && guest.busTime !== 'none' && ` (Bus at ${guest.busTime})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-gray-600 mb-4">We look forward to celebrating with you!</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Close
        </button>
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
          <p className="text-lg text-gray-600 mt-1">Will you attend?</p>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-8 flex-1 overflow-y-auto">
        {formData.map((guest, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0">
            <h3 className="text-left mb-4 text-base font-normal">{guest.fullName}</h3>
            
            {/* Coming/Not Coming Selection */}
            <div className="mb-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateGuestStatus(index, true)}
                  className={`flex-1 py-2 px-3 border-2 transition-colors text-sm ${
                    guest.coming === true
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-green-400'
                  }`}
                >
                  Attending
                </button>
                <button
                  type="button"
                  onClick={() => updateGuestStatus(index, false)}
                  className={`flex-1 py-2 px-3 border-2 transition-colors text-sm ${
                    guest.coming === false
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-red-400'
                  }`}
                >
                  Not Attending
                </button>
              </div>
            </div>

            {/* Bus Selection - only show if coming */}
            {guest.coming && (
              <div>
                <h4 className="text-left font-normal mb-3 text-gray-700 text-sm">Shuttle from Tel-Aviv to venue?</h4>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateBusTime(index, 'none')}
                    className={`flex-1 py-2 px-3 border-2 transition-colors text-sm ${
                      guest.busTime === 'none'
                        ? 'bg-gray-600 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    None
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBusTime(index, '16:30')}
                    className={`flex-1 py-2 px-3 border-2 transition-colors text-sm ${
                      guest.busTime === '16:30'
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                    }`}
                  >
                    16:30
                  </button>
                  <button
                    type="button"
                    onClick={() => updateBusTime(index, '17:00')}
                    className={`flex-1 py-2 px-3 border-2 transition-colors text-sm ${
                      guest.busTime === '17:00'
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                    }`}
                  >
                    17:00
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2 pt-4 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-600 text-white py-2 px-4 border-2 border-gray-600 hover:bg-gray-700 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 px-4 border-2 border-green-600 hover:bg-green-700 transition-colors text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RSVPForm; 