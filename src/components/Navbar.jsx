import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Work',     href: '#work'     },
  { label: 'About',   href: '#about'    },
  { label: 'Services',href: '#services' },
  { label: 'Contact', href: '#contact'  },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        <span className={styles.logoMark}>F</span>
        <span className={styles.logoText}>FRAME<em>&</em>SOUL</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {NAV_LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href} onClick={() => setMenuOpen(false)} className={styles.link}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="/dashboard" className={styles.cta}>Dashboard</a>
        </li>
      </ul>

      <button
        className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
