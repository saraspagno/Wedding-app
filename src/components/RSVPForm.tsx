import React, { useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../types/firebase';
import { Guest, GuestGroup, BusTime } from '../types/interfaces';
import { BusIcon } from './icons';

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

  return (
    <div className="flex flex-col sm:mx-0">
      <div className="relative mb-6">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-xl mb-4"
        >
          ✕
        </button>
        <div className="pt-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dear {guestGroup.groupInvite},</h1>
          <p className="text-lg text-gray-600">Will you attend Sara and Gavriel's wedding?</p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto">
        {formData.map((guest, index) => (
          <div key={index} className="bg-gray-50 p-4 border border-gray-200">
            <div className="grid grid-cols-1 gap-2">
              <div className="text-left">
                <span className="font-medium text-gray-900">{guest.fullName}</span>
              </div>
              
              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => updateGuestStatus(index, true)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    guest.coming === true
                      ? 'bg-green-100 text-green-800 border-green-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50'
                  }`}
                >
                  Coming
                </button>
                <button
                  type="button"
                  onClick={() => updateGuestStatus(index, false)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    guest.coming === false
                      ? 'bg-red-100 text-red-800 border-red-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50'
                  }`}
                >
                  Not Coming
                </button>
              </div>

              {/* Bus Selection - only show if coming */}
              {guest.coming && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600">Shuttle</span>
                    <BusIcon className="text-gray-600" size="sm" />
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => updateBusTime(index, 'none')}
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        guest.busTime === 'none'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      None
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBusTime(index, '16:30')}
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        guest.busTime === '16:30'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      16:30
                    </button>
                    <button
                      type="button"
                      onClick={() => updateBusTime(index, '17:00')}
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        guest.busTime === '17:00'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50'
                      }`}
                    >
                      17:00
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-white text-gray-700 border border-gray-300 font-medium py-3 px-4 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white border border-blue-600 font-medium py-3 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RSVPForm; 