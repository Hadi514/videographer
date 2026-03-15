import { useState, useEffect, useRef } from 'react';
import { getVideos, addVideo, deleteVideo, updateVideo } from '../../data/store';
import styles from './Panel.module.css';

const CATEGORIES = ['Brand Film', 'Commercial', 'Documentary', 'Wedding', 'Music Video', 'Event', 'Other'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => String(CURRENT_YEAR - i));

const emptyForm = {
  title: '', url: '', description: '', category: 'Brand Film', year: String(CURRENT_YEAR), thumbnail: '',
};

function VideoForm({ initial = emptyForm, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial);
  const thumbRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleThumb = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set('thumbnail', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Video Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder="My Brand Film"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Video URL</label>
          <input
            type="url"
            value={form.url}
            onChange={e => set('url', e.target.value)}
            placeholder="https://youtube.com/watch?v=... or Vimeo URL"
          />
          <span className={styles.fieldHint}>YouTube, Vimeo, or direct video link</span>
        </div>

        <div className={styles.field}>
          <label>Category</label>
          <select value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label>Year</label>
          <select value={form.year} onChange={e => set('year', e.target.value)}>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="Brief description of the project..."
            rows={3}
          />
        </div>

        <div className={`${styles.field} ${styles.fullWidth}`}>
          <label>Custom Thumbnail</label>
          <div className={styles.thumbUpload}>
            {form.thumbnail ? (
              <div className={styles.thumbPreview}>
                <img src={form.thumbnail} alt="Thumbnail preview" />
                <button type="button" className={styles.thumbRemove} onClick={() => set('thumbnail', '')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ) : (
              <button type="button" className={styles.thumbBtn} onClick={() => thumbRef.current.click()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Upload Thumbnail</span>
                <span className={styles.thumbHint}>PNG, JPG, WEBP — optional, auto-fetched for YouTube</span>
              </button>
            )}
            <input
              ref={thumbRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleThumb}
            />
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.btnCancel} onClick={onCancel}>Cancel</button>
        <button type="submit" className={styles.btnSave} disabled={saving}>
          {saving ? <span className={styles.spinner} /> : null}
          Save Video
        </button>
      </div>
    </form>
  );
}

export default function VideosPanel() {
  const [videos,   setVideos]   = useState([]);
  const [adding,   setAdding]   = useState(false);
  const [editing,  setEditing]  = useState(null); // video id
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(null);

  const refresh = () => setVideos(getVideos());
  useEffect(() => { refresh(); }, []);

  const handleAdd = (form) => {
    setSaving(true);
    setTimeout(() => {
      addVideo(form);
      refresh();
      setAdding(false);
      setSaving(false);
    }, 400);
  };

  const handleEdit = (form) => {
    setSaving(true);
    setTimeout(() => {
      updateVideo(editing, form);
      refresh();
      setEditing(null);
      setSaving(false);
    }, 400);
  };

  const handleDelete = (id) => {
    setDeleting(id);
    setTimeout(() => {
      deleteVideo(id);
      refresh();
      setDeleting(null);
    }, 300);
  };

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.panelHeader}>
        <div>
          <h1 className={styles.panelTitle}>Video Projects</h1>
          <p className={styles.panelSub}>{videos.length} video{videos.length !== 1 ? 's' : ''} in your portfolio</p>
        </div>
        {!adding && !editing && (
          <button className={styles.btnPrimary} onClick={() => setAdding(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Video
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <div className={styles.formCard}>
          <div className={styles.formCardHeader}>
            <h3>Add New Video</h3>
          </div>
          <VideoForm onSave={handleAdd} onCancel={() => setAdding(false)} saving={saving} />
        </div>
      )}

      {/* Video list */}
      {videos.length === 0 && !adding ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🎬</div>
          <h3>No videos yet</h3>
          <p>Add your first video project to showcase your work on the portfolio.</p>
          <button className={styles.btnPrimary} onClick={() => setAdding(true)}>
            Add Your First Video
          </button>
        </div>
      ) : (
        <div className={styles.list}>
          {videos.map(v => (
            <div key={v.id} className={`${styles.listItem} ${deleting === v.id ? styles.deleting : ''}`}>
              {editing === v.id ? (
                <div className={styles.inlineEdit}>
                  <div className={styles.formCardHeader}>
                    <h3>Edit: {v.title}</h3>
                  </div>
                  <VideoForm
                    initial={{ title: v.title, url: v.url || '', description: v.description || '', category: v.category || 'Brand Film', year: v.year || String(CURRENT_YEAR), thumbnail: v.thumbnail || '' }}
                    onSave={handleEdit}
                    onCancel={() => setEditing(null)}
                    saving={saving}
                  />
                </div>
              ) : (
                <div className={styles.listItemInner}>
                  <div className={styles.listThumb}>
                    {v.thumbnail
                      ? <img src={v.thumbnail} alt={v.title} />
                      : <div className={styles.listThumbPlaceholder}>▶</div>
                    }
                  </div>
                  <div className={styles.listMeta}>
                    <div className={styles.listTitle}>{v.title}</div>
                    <div className={styles.listTags}>
                      <span className={styles.tag}>{v.category || 'Film'}</span>
                      {v.year && <span className={styles.tag}>{v.year}</span>}
                    </div>
                    {v.url && (
                      <div className={styles.listUrl}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>
                        </svg>
                        <span>{v.url.length > 52 ? v.url.slice(0, 52) + '…' : v.url}</span>
                      </div>
                    )}
                    {v.description && <p className={styles.listDesc}>{v.description}</p>}
                  </div>
                  <div className={styles.listActions}>
                    <button className={styles.btnEdit} onClick={() => setEditing(v.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit
                    </button>
                    <button className={styles.btnDelete} onClick={() => handleDelete(v.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
