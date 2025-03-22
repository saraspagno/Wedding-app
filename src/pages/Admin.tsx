import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../types/firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../styles/Admin.module.css';

interface Guest {
  id: string;
  [key: string]: any; 
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'guests'));
        const guestsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        
        const allColumns = new Set<string>();
        guestsData.forEach(guest => {
          Object.keys(guest).forEach(key => {
            if (key !== 'id') allColumns.add(key);
          });
        });
        
        setColumns(Array.from(allColumns));
        setGuests(guestsData);
      } catch (error) {
        console.error('Error fetching guests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleSignOut} className={styles.signOutButton}>
          Sign Out
        </button>
      </div>

      <div className={styles.content}>
        <section className={styles.statsSection}>
          <h2>Guest Statistics</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Total Guests</h3>
              <p>{guests.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Confirmed</h3>
              <p>{guests.filter(guest => guest.rsvp === true).length}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Pending</h3>
              <p>{guests.filter(guest => guest.rsvp === false).length}</p>
            </div>
          </div>
        </section>

        <section className={styles.guestList}>
          <h2>Guest List</h2>
          <div className={styles.tableContainer}>
            {loading ? (
              <p>Loading guests...</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    {columns.map(column => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guests.map(guest => (
                    <tr key={guest.id}>
                      {columns.map(column => (
                        <td key={`${guest.id}-${column}`}>
                          {guest[column]?.toString() ?? '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin; 