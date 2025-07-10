import { useEffect, useState } from 'react';
import styles from './Hero.module.scss';
import { IoIosFlash } from 'react-icons/io';
import { GiCyberEye } from 'react-icons/gi';
import { FaTrophy } from 'react-icons/fa';

interface HeroProps {
  userName: string;
  userRank: number;
}


function Hero({userName, userRank}: HeroProps) {
  const [animatedRank, setAnimatedRank] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const increment = userRank / 20;
      const rankTimer = setInterval(() => {
        current += increment;

        if (current >= userRank) {
          setAnimatedRank(userRank);
          clearInterval(rankTimer);
        } else {
          setAnimatedRank(Math.floor(current));
        }
      }, 20)
    }, 500)

    return () => clearTimeout(timer);
  }, [userRank])

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeText}>Welcome back, <span className={styles.userName}>{userName}</span></h1>
          <p className={styles.subtitle}>
            Ready to analyze some faces with AI magic? ✨
          </p>
        </div>

        <div className={styles.statsGrid}>

        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><FaTrophy /></div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>#{animatedRank}</span>
              <span className={styles.statLabel}>Your Rank</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}><GiCyberEye /></div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>2.5K+</span>
              <span className={styles.statLabel}>Faces Detected</span>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}><IoIosFlash />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>99.8%</span>
              <span className={styles.statLabel}>Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroBackground}>
        <div className={styles.floatingElements}>
          <div className={styles.element}></div>
          <div className={styles.element}></div>
          <div className={styles.element}></div>

          <div className={styles.element}></div>
          <div className={styles.element}></div>
          <div className={styles.element}></div>
        </div>
      </div>
    </section>
  )
}
export default Hero