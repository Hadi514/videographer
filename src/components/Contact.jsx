import { useState } from 'react';
import { getProfile } from '../data/store';
import styles from './Contact.module.css';

export default function Contact() {
  const profile = getProfile();
  const [form,    setForm]    = useState({ name: '', email: '', project: '', message: '' });
  const [sent,    setSent]    = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real setup this would POST to an API
    console.log('Form submitted:', form);
    setSent(true);
    setForm({ name: '', email: '', project: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>Get In Touch</span>
          </div>

          <h2 className={styles.title}>
            Ready to Tell<br /><em>Your Story?</em>
          </h2>

          <p className={styles.desc}>
            Every great film starts with a conversation. Reach out and let's discuss what we can create together.
          </p>

          <div className={styles.socials}>
            {profile.instagram && (
              <div className={styles.socialItem}>
                <span className={styles.socialIcon}>IG</span>
                <span>{profile.instagram}</span>
              </div>
            )}
            {profile.youtube && (
              <div className={styles.socialItem}>
                <span className={styles.socialIcon}>YT</span>
                <span>{profile.youtube}</span>
              </div>
            )}
            {profile.vimeo && (
              <div className={styles.socialItem}>
                <span className={styles.socialIcon}>VM</span>
                <span>{profile.vimeo}</span>
              </div>
            )}
          </div>

          <div className={styles.directContact}>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className={styles.directItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                {profile.email}
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className={styles.directItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {profile.phone}
              </a>
            )}
          </div>
        </div>

        <div className={styles.right}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email Address</label>
                  <input id="email" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="project">Project Type</label>
                <select id="project" name="project" value={form.project} onChange={handleChange} required>
                  <option value="" disabled>Select a service...</option>
                  <option value="brand-film">Brand Film</option>
                  <option value="commercial">Commercial</option>
                  <option value="documentary">Documentary</option>
                  <option value="post-production">Post Production</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Tell me about your project</label>
                <textarea id="message" name="message" rows={5} placeholder="What's your vision? Timeline? Budget range?" value={form.message} onChange={handleChange} required />
              </div>

              <button type="submit" className={styles.submit}>
                <span>Send Message</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerName}>{profile.name || 'Frame & Soul'}</span>
        <span className={styles.footerCopy}>© {new Date().getFullYear()} — All Rights Reserved</span>
        <a href="/dashboard" className={styles.footerAdmin}>Admin</a>
      </div>
    </section>
  );
}
