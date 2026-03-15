import { useState, useEffect } from 'react';
import { getVideos } from '../data/store';
import styles from './Work.module.css';

function getYouTubeThumbnail(url) {
  try {
    const u = new URL(url);
    let id = u.searchParams.get('v');
    if (!id && u.hostname === 'youtu.be') id = u.pathname.slice(1);
    if (id) return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  } catch {}
  return null;
}

function getVimeoId(url) {
  try {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  } catch {}
  return null;
}

function getEmbedUrl(url) {
  try {
    const u = new URL(url);
    let id = u.searchParams.get('v');
    if (!id && u.hostname === 'youtu.be') id = u.pathname.slice(1);
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    const vId = getVimeoId(url);
    if (vId) return `https://player.vimeo.com/video/${vId}?autoplay=1`;
  } catch {}
  return url;
}

function VideoCard({ video, onPlay }) {
  const thumb = video.thumbnail ||
    (video.url ? getYouTubeThumbnail(video.url) : null);

  return (
    <div className={styles.card} onClick={() => onPlay(video)}>
      <div className={styles.thumb}>
        {thumb
          ? <img src={thumb} alt={video.title} />
          : <div className={styles.thumbPlaceholder}><span>▶</span></div>
        }
        <div className={styles.overlay}>
          <div className={styles.playBtn}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        <div className={styles.categoryTag}>{video.category || 'Film'}</div>
      </div>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{video.title}</h3>
        {video.description && (
          <p className={styles.cardDesc}>{video.description}</p>
        )}
        {video.year && (
          <span className={styles.cardYear}>{video.year}</span>
        )}
      </div>
    </div>
  );
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const embedUrl = video.url ? getEmbedUrl(video.url) : null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className={styles.videoWrapper}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={video.url} controls autoPlay />
          )}
        </div>
        <div className={styles.modalMeta}>
          <h3>{video.title}</h3>
          {video.description && <p>{video.description}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [videos,   setVideos]   = useState([]);
  const [active,   setActive]   = useState(null);
  const [filter,   setFilter]   = useState('All');

  useEffect(() => {
    setVideos(getVideos());
  }, []);

  const categories = ['All', ...Array.from(new Set(videos.map(v => v.category || 'Film')))];
  const filtered = filter === 'All' ? videos : videos.filter(v => (v.category || 'Film') === filter);

  return (
    <section className={styles.section} id="work">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>
            <span className={styles.labelLine} />
            <span>Selected Work</span>
          </div>
          <h2 className={styles.title}>
            Projects That<br /><em>Move People</em>
          </h2>
        </div>

        {videos.length > 0 && categories.length > 2 && (
          <div className={styles.filters}>
            {categories.map(c => (
              <button
                key={c}
                className={`${styles.filterBtn} ${filter === c ? styles.active : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🎬</div>
            <p>No projects yet. Add videos from the <a href="/dashboard">dashboard</a>.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((v, i) => (
              <div key={v.id} style={{ animationDelay: `${i * 0.08}s` }}>
                <VideoCard video={v} onPlay={setActive} />
              </div>
            ))}
          </div>
        )}
      </div>

      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </section>
  );
}
