import React, { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';

interface Guest {
  id: string;
  name: string;
  lastName: string;
  numberOfPeople: number;
  phoneNumber: string;
  rsvpLink?: string;
  peopleComing?: number;
  peopleNeedingBus?: number;
  [key: string]: any; 
}

interface GuestTableProps {
  guests: Guest[];
  onAddGuest: () => void;
  onGenerateRsvpLink: (guestId: string) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({
  guests,
  onAddGuest,
  onGenerateRsvpLink
}) => {
  const [selectedGuests, setSelectedGuests] = useState<Set<string>>(new Set());

  const toggleGuestSelection = (guestId: string) => {
    const newSelected = new Set(selectedGuests);
    if (newSelected.has(guestId)) {
      newSelected.delete(guestId);
    } else {
      newSelected.add(guestId);
    }
    setSelectedGuests(newSelected);
  };

  const generateLinksForSelected = () => {
    selectedGuests.forEach(guestId => {
      onGenerateRsvpLink(guestId);
    });
    setSelectedGuests(new Set());
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={onAddGuest}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Guest
          </button>
          {selectedGuests.size > 0 && (
            <button
              onClick={generateLinksForSelected}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Generate Links for Selected ({selectedGuests.size})
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-8 p-2 border-b"></th>
              <th className="p-2 text-left border-b">Name</th>
              <th className="p-2 text-left border-b">Last Name</th>
              <th className="p-2 text-left border-b">Number of People</th>
              <th className="p-2 text-left border-b">Phone Number</th>
              <th className="p-2 text-left border-b bg-blue-50">RSVP Link</th>
              <th className="p-2 text-left border-b bg-blue-50">People Coming</th>
              <th className="p-2 text-left border-b bg-blue-50">People Needing Bus</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr 
                key={guest.id}
                className={`hover:bg-gray-50 ${selectedGuests.has(guest.id) ? 'bg-blue-50' : ''}`}
              >
                <td className="p-2 border-b">
                  <input
                    type="checkbox"
                    checked={selectedGuests.has(guest.id)}
                    onChange={() => toggleGuestSelection(guest.id)}
                    className="rounded"
                  />
                </td>
                <td className="p-2 border-b">{guest.name}</td>
                <td className="p-2 border-b">{guest.lastName}</td>
                <td className="p-2 border-b">{guest.numberOfPeople}</td>
                <td className="p-2 border-b">{guest.phoneNumber}</td>
                <td className="p-2 border-b bg-blue-50">
                  {guest.rsvpLink ? (
                    <a 
                      href={guest.rsvpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {guest.rsvpLink}
                    </a>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-2 border-b bg-blue-50">{guest.peopleComing || '-'}</td>
                <td className="p-2 border-b bg-blue-50">{guest.peopleNeedingBus || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestTable; 