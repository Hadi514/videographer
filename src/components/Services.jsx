import { DEFAULT_SERVICES } from '../data/store';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>What I Do</span>
          </div>
          <h2 className={styles.title}>
            Services &<br /><em>Capabilities</em>
          </h2>
          <p className={styles.subtitle}>
            From concept to color grade, every stage of production handled with intention.
          </p>
        </div>

        <div className={styles.grid}>
          {DEFAULT_SERVICES.map((svc, i) => (
            <div key={svc.id} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{svc.icon}</span>
                <div className={styles.iconGlow} />
              </div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.desc}</p>
              <div className={styles.cardAccent} />
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaText}>Have a project in mind?</p>
            <h3 className={styles.ctaTitle}>Let's Create Something Extraordinary</h3>
            <a href="#contact" className={styles.ctaBtn}>
              Start a Conversation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <div className={styles.ctaBg} />
        </div>
      </div>
    </section>
  );
}
