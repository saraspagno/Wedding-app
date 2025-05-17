import React, { useState } from 'react';

interface Guest {
  fullName: string;
  coming?: boolean;
  needsBus?: boolean;
}

interface AddGuestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (guestGroup: {
    groupInvite: string;
    contact: string;
    guests: Guest[];
  }) => void;
}

const AddGuestForm: React.FC<AddGuestFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    groupInvite: '',
    contact: '',
    guests: [{ fullName: '' }] as Guest[]
  });

  const addGuest = () => {
    setFormData(prev => ({
      ...prev,
      guests: [...prev.guests, { fullName: '' }]
    }));
  };

  const removeGuest = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guests: prev.guests.filter((_, i) => i !== index)
    }));
  };

  const updateGuestName = (index: number, fullName: string) => {
    setFormData(prev => ({
      ...prev,
      guests: prev.guests.map((guest, i) => 
        i === index ? { ...guest, fullName } : guest
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out any empty guest names
    const filteredGuests = formData.guests.filter(guest => guest.fullName.trim() !== '');
    onSubmit({
      ...formData,
      guests: filteredGuests
    });
    setFormData({
      groupInvite: '',
      contact: '',
      guests: [{ fullName: '' }]
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Guest Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name (e.g., "Family Spagnoletto")
            </label>
            <input
              type="text"
              value={formData.groupInvite}
              onChange={(e) => setFormData(prev => ({ ...prev, groupInvite: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Information
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Phone number or email"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            {formData.guests.map((guest, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={guest.fullName}
                  onChange={(e) => updateGuestName(index, e.target.value)}
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full Name"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeGuest(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addGuest}
              className="w-full p-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            >
              Add Another Guest
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              Add Guest Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuestForm; 