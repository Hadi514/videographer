import { useState } from 'react';
import { authLogin } from '../data/store';
import styles from './Login.module.css';

export default function Login({ onLogin }) {
  const [form,  setForm]  = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const ok = authLogin(form.username, form.password);
      if (ok) {
        onLogin();
      } else {
        setError('Invalid credentials. Try admin / admin123');
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className={styles.page}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.grid} />

      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <div className={styles.logoMark}>F</div>
          <div className={styles.logoText}>
            <span>FRAME<em>&</em>SOUL</span>
            <span className={styles.logoSub}>Admin Dashboard</span>
          </div>
        </div>

        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.sub}>Sign in to manage your portfolio</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="admin"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <>
                <span>Sign In</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className={styles.hint}>
          <span className={styles.hintIcon}>🔐</span>
          <span>Default: <code>admin</code> / <code>admin123</code></span>
        </div>

        <a href="/" className={styles.back}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Portfolio
        </a>
      </div>
    </div>
  );
}
