import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <h1>Wedding Logo</h1>
      </Link>
      <nav className={styles.nav}>
        <Link to="/rsvp" className={styles.rsvpButton}>RSVP</Link>
        <Link to="/admin" className={styles.loginButton}>Login</Link>
      </nav>
    </header>
  );
};

export default Header; 