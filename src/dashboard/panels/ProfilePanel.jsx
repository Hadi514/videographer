import { useState, useRef } from 'react';
import { getProfile, saveProfile } from '../../data/store';
import styles from './Panel.module.css';

export default function ProfilePanel() {
  const [profile, setProfile] = useState(getProfile());
  const [saved,   setSaved]   = useState(false);
  const [saving,  setSaving]  = useState(false);
  const avatarRef = useRef();

  const set = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('avatar', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      saveProfile(profile);
      // Trigger storage event for cross-tab updates
      window.dispatchEvent(new Event('storage'));
      setSaved(true);
      setSaving(false);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h1 className={styles.panelTitle}>Profile Settings</h1>
          <p className={styles.panelSub}>Changes reflect immediately on the portfolio frontend</p>
        </div>
      </div>

      <form className={styles.profileForm} onSubmit={handleSave}>
        {/* Avatar */}
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <h3>Profile Photo</h3>
          </div>
          <div className={styles.avatarSection}>
            <div className={styles.avatarPreviewWrap}>
              {profile.avatar
                ? <img src={profile.avatar} alt="Avatar" className={styles.avatarPreview} />
                : (
                  <div className={styles.avatarPlaceholder}>
                    <span>{(profile.name || 'A').charAt(0)}</span>
                  </div>
                )
              }
            </div>
            <div className={styles.avatarActions}>
              <button type="button" className={styles.btnSecondary} onClick={() => avatarRef.current.click()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                Upload Photo
              </button>
              {profile.avatar && (
                <button type="button" className={styles.btnDanger} onClick={() => set('avatar', '')}>
                  Remove
                </button>
              )}
              <input ref={avatarRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
              <p className={styles.avatarHint}>JPG, PNG or WEBP. Displayed in the About section.</p>
            </div>
          </div>
        </div>

        {/* Basic info */}
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <h3>Basic Information</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Tagline / Title</label>
              <input
                type="text"
                value={profile.tagline}
                onChange={e => set('tagline', e.target.value)}
                placeholder="Visual Storyteller & Cinematic Director"
              />
              <span className={styles.fieldHint}>Appears in the Hero and About sections</span>
            </div>

            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Bio</label>
              <textarea
                value={profile.bio}
                onChange={e => set('bio', e.target.value)}
                rows={6}
                placeholder="Tell your story..."
              />
              <span className={styles.fieldHint}>Displayed in the About section. Use new lines for paragraphs.</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <h3>Contact Details</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className={styles.field}>
              <label>Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className={styles.field}>
              <label>Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={e => set('location', e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <h3>Social Handles</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Instagram</label>
              <input
                type="text"
                value={profile.instagram}
                onChange={e => set('instagram', e.target.value)}
                placeholder="@yourhandle"
              />
            </div>

            <div className={styles.field}>
              <label>YouTube Channel</label>
              <input
                type="text"
                value={profile.youtube}
                onChange={e => set('youtube', e.target.value)}
                placeholder="Channel name"
              />
            </div>

            <div className={styles.field}>
              <label>Vimeo</label>
              <input
                type="text"
                value={profile.vimeo}
                onChange={e => set('vimeo', e.target.value)}
                placeholder="vimeo username"
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className={styles.saveBar}>
          {saved && (
            <div className={styles.savedMsg}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Profile saved successfully!
            </div>
          )}
          <button type="submit" className={styles.btnPrimary} disabled={saving}>
            {saving ? <span className={styles.spinner} /> : null}
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
