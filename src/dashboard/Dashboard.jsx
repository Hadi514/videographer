import { useState } from 'react';
import { authLogout } from '../data/store';
import VideosPanel from './panels/VideosPanel';
import ProfilePanel from './panels/ProfilePanel';
import styles from './Dashboard.module.css';

const NAV = [
  {
    id: 'videos',
    label: 'Videos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="2.18"/><path d="m10 8 6 4-6 4V8z"/>
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function Dashboard({ onLogout }) {
  const [active, setActive] = useState('videos');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    authLogout();
    onLogout();
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.sidebarTop}>
          <a href="/" className={styles.logo}>
            <div className={styles.logoMark}>F</div>
            <div className={styles.logoInfo}>
              <span className={styles.logoName}>Frame<em>&</em>Soul</span>
              <span className={styles.logoDash}>Dashboard</span>
            </div>
          </a>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navLabel}>Management</span>
          {NAV.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${active === item.id ? styles.navActive : ''}`}
              onClick={() => { setActive(item.id); setSidebarOpen(false); }}
            >
              {item.icon}
              <span>{item.label}</span>
              {active === item.id && <div className={styles.navIndicator} />}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <a href="/" className={styles.viewSite}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
            </svg>
            View Portfolio
          </a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className={styles.main}>
        {/* Top bar */}
        <div className={styles.topbar}>
          <button className={styles.hamburger} onClick={() => setSidebarOpen(o => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div className={styles.topbarTitle}>
            {NAV.find(n => n.id === active)?.label}
          </div>

          <button className={styles.topLogout} onClick={handleLogout} title="Sign out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
          </button>
        </div>

        {/* Panel */}
        <div className={styles.content}>
          {active === 'videos'  && <VideosPanel />}
          {active === 'profile' && <ProfilePanel />}
        </div>
      </main>
    </div>
  );
}
