import { useState, useEffect } from 'react';
import { getProfile } from '../data/store';
import styles from './About.module.css';

export default function About() {
  const [profile, setProfile] = useState(getProfile());

  useEffect(() => {
    const onStorage = () => setProfile(getProfile());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <div className={styles.avatarCol}>
          <div className={styles.avatarWrap}>
            {profile.avatar
              ? <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
              : (
                <div className={styles.avatarPlaceholder}>
                  <span>{(profile.name || 'A').charAt(0)}</span>
                </div>
              )
            }
            <div className={styles.avatarGlow} />
            <div className={styles.avatarBorder} />
          </div>

          <div className={styles.contactCard}>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className={styles.contactRow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span>{profile.email}</span>
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className={styles.contactRow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.location && (
              <div className={styles.contactRow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>About Me</span>
          </div>

          <h2 className={styles.name}>
            {profile.name || 'The Filmmaker'}
          </h2>

          <p className={styles.tagline}>{profile.tagline}</p>

          <div className={styles.bio}>
            {(profile.bio || '').split('\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className={styles.tools}>
            <span className={styles.toolsLabel}>Tools & Expertise</span>
            <div className={styles.tagList}>
              {['Sony FX6', 'DJI Ronin', 'DaVinci Resolve', 'Adobe Premiere', 'After Effects', 'ARRI Alexa', 'RED Cinema', 'Drone Operations'].map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
