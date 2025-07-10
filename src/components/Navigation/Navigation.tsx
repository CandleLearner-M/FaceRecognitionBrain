import { useState } from 'react';
import styles from './Navigation.module.scss';
import { LuBrainCircuit } from 'react-icons/lu';

interface User {
  name: string;
  avatar: string;
  rank: number;
}

function Navigation() {
  const [user] = useState<User>({
    name: "Mostafa",
    avatar: "/Logo.jpg",
    rank: 5
  });

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>
          <LuBrainCircuit />
        </div>
        <span className={styles.brandText}>Face Detect AI</span>
      </div>

      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRank}>Rank #{user.rank}</span>
          </div>
          <div className={styles.userAvatar}>
            <img src={user.avatar} alt={user.name} />
            <div className={styles.onlineIndicator}></div>
          </div>
        </div>
        
        <button className={styles.signOutBtn}>
          <span>Sign Out</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;