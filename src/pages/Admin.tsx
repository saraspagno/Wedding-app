import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../types/firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import GuestTable from '../components/GuestTable';
import AddGuestForm from '../components/AddGuestForm';

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

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [guestGroups, setGuestGroups] = useState<GuestGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddGuestFormOpen, setIsAddGuestFormOpen] = useState(false);

  const fetchGuestGroups = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'guestGroups'));
      const groupsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuestGroup[];
      
      // Sort groups: those who haven't RSVP'd go to the bottom
      const sortedGroups = [...groupsData].sort((a, b) => {
        // If one has RSVP'd and the other hasn't, prioritize the one who has
        const aHasResponded = a.guests.some(g => g.coming !== undefined);
        const bHasResponded = b.guests.some(g => g.coming !== undefined);
        if (aHasResponded && !bHasResponded) return -1;
        if (!aHasResponded && bHasResponded) return 1;
        
        // If both have RSVP'd or both haven't, sort by group name
        return a.groupInvite.localeCompare(b.groupInvite);
      });
      
      setGuestGroups(sortedGroups);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestGroups();
  }, []);

  const handleAddGuestGroup = async (groupData: {
    groupInvite: string;
    contact: string;
    guests: Guest[];
  }) => {
    try {
      const docRef = await addDoc(collection(db, 'guestGroups'), groupData);
      const newGroup = { ...groupData, id: docRef.id };
      setGuestGroups([...guestGroups, newGroup]);
    } catch (error) {
      console.error('Error adding guest group:', error);
    }
  };

  const handleGenerateRsvpCode = async (groupId: string) => {
    try {
      // Check if group already has an RSVP code
      const group = guestGroups.find(g => g.id === groupId);
      if (group?.rsvpCode) {
        alert('This group already has an RSVP code');
        return;
      }

      // Generate a unique RSVP code for the group
      const rsvpCode = Math.random().toString(36).substring(2, 10);      
      await updateDoc(doc(db, 'guestGroups', groupId), {
        rsvpCode
      });
      
      setGuestGroups(guestGroups.map(group => 
        group.id === groupId 
          ? { ...group, rsvpCode }
          : group
      ));
    } catch (error) {
      console.error('Error generating RSVP code:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Calculate statistics
  const totalInvited = guestGroups.reduce((sum, group) => sum + group.guests.length, 0);
  const totalComing = guestGroups.reduce((sum, group) => 
    sum + group.guests.filter(guest => guest.coming).length, 0
  );
  const totalResponded = guestGroups.reduce((sum, group) => 
    sum + group.guests.filter(guest => guest.coming !== undefined).length, 0
  );
  const totalNotComing = totalResponded - totalComing;
  const totalNeedingBus = guestGroups.reduce((sum, group) => 
    sum + group.guests.filter(guest => guest.needsBus).length, 0
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-gray-800 m-0">Admin Dashboard</h1>
        <button 
          onClick={handleSignOut} 
          className="bg-red-600 hover:bg-red-700 text-white border-none py-2 px-4 rounded cursor-pointer transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-gray-800 m-0 mb-4">Guest Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-gray-50 p-4 rounded text-center">
              <h3 className="text-gray-600 text-sm mb-2">Total People Invited</h3>
              <p className="text-2xl font-bold text-gray-800 m-0">{totalInvited}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <h3 className="text-gray-600 text-sm mb-2">Total People Coming</h3>
              <p className="text-2xl font-bold text-gray-800 m-0">{totalComing}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <h3 className="text-gray-600 text-sm mb-2">Total Responses</h3>
              <p className="text-2xl font-bold text-gray-800 m-0">{totalResponded}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <h3 className="text-gray-600 text-sm mb-2">Total Not Coming</h3>
              <p className="text-2xl font-bold text-gray-800 m-0">{totalNotComing}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded text-center">
              <h3 className="text-gray-600 text-sm mb-2">Total Needing Bus</h3>
              <p className="text-2xl font-bold text-gray-800 m-0">{totalNeedingBus}</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          {loading ? (
            <p>Loading guest groups...</p>
          ) : (
            <GuestTable
              guestGroups={guestGroups}
              onAddGuestGroup={() => setIsAddGuestFormOpen(true)}
              onGenerateRsvpCode={handleGenerateRsvpCode}
            />
          )}
        </section>
      </div>

      <AddGuestForm
        isOpen={isAddGuestFormOpen}
        onClose={() => setIsAddGuestFormOpen(false)}
        onSubmit={handleAddGuestGroup}
      />
    </div>
  );
};

export default Admin; 