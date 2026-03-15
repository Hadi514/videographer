import { useEffect, useState } from 'react';
import { getProfile } from '../data/store';
import styles from './Hero.module.css';

const REEL_WORDS = ['Stories', 'Emotions', 'Moments', 'Visions', 'Truth'];

export default function Hero() {
  const profile = getProfile();
  const [wordIdx, setWordIdx] = useState(0);
  const [fading,  setFading]  = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setWordIdx(i => (i + 1) % REEL_WORDS.length);
        setFading(false);
      }, 400);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.hero} id="hero">
      {/* Ambient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid} />

      <div className={styles.inner}>
        <div className={`${styles.eyebrow} fade-up fade-up-1`}>
          <span className={styles.dot} />
          <span className={styles.eyebrowText}>Available for Projects — 2025</span>
        </div>

        <h1 className={`${styles.headline} fade-up fade-up-2`}>
          Crafting<br />
          <span className={`${styles.rotating} ${fading ? styles.out : styles.in}`}>
            {REEL_WORDS[wordIdx]}
          </span>
          <br />
          Through Film
        </h1>

        <p className={`${styles.sub} fade-up fade-up-3`}>
          {profile.tagline}
        </p>

        <div className={`${styles.actions} fade-up fade-up-4`}>
          <a href="#work" className={styles.btnPrimary}>
            <span>View Reel</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#contact" className={styles.btnGhost}>Let's Talk</a>
        </div>

        <div className={`${styles.stats} fade-up fade-up-5`}>
          <div className={styles.stat}>
            <span className={styles.statNum}>8+</span>
            <span className={styles.statLabel}>Years</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>200+</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>40+</span>
            <span className={styles.statLabel}>Clients</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
