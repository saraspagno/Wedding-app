import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Add your logo here */}
        <h1>Wedding Logo</h1>
      </div>
      <div className={styles.message}>
        <p>Logic Message</p>
      </div>
    </header>
  );
};

export default Header; 