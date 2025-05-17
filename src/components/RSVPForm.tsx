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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">RSVP for {guestGroup.groupInvite}</h1>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Buses from Tel Aviv City Center</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={guest.busTime === 'none'}
                        onChange={() => updateBusTime(index, 'none')}
                        className="mr-2"
                      />
                      No Bus
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={guest.busTime === '16:30'}
                        onChange={() => updateBusTime(index, '16:30')}
                        className="mr-2"
                      />
                      Bus at 16:30
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={guest.busTime === '17:00'}
                        onChange={() => updateBusTime(index, '17:00')}
                        className="mr-2"
                      />
                      Bus at 17:00
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Submit RSVP
          </button>
        </div>
      </form>
    </div>
  );
};

export default RSVPForm; 