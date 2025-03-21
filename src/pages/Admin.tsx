import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../types/firebase';
import { signOut } from 'firebase/auth';
import styles from '../styles/Admin.module.css';

const Admin: React.FC = () => {
  const navigate = useNavigate();

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
        <h1>Admin dashboard</h1>
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
              <p>0</p>
            </div>
            <div className={styles.statCard}>
              <h3>Confirmed</h3>
              <p>0</p>
            </div>
            <div className={styles.statCard}>
              <h3>Pending</h3>
              <p>0</p>
            </div>
          </div>
        </section>

        <section className={styles.guestList}>
          <h2>Guest List</h2>
          <div className={styles.listContainer}>
            {/* Guest list will be populated here */}
            <p>No guests yet</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin; 