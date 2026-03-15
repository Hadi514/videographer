// ─── Default portfolio data (acts like a JSON config) ───────────────────────
export const DEFAULT_PROFILE = {
  name: 'Aryan Malik',
  tagline: 'Visual Storyteller & Cinematic Director',
  bio: 'I craft stories through motion. With over 8 years behind the lens, I specialize in commercial films, brand narratives, and documentary work that moves people — not just their eyes, but their hearts. Every frame is intentional. Every cut has a reason.',
  email: 'aryan@frameandsoul.com',
  phone: '+92 300 123 4567',
  location: 'Lahore, Pakistan',
  avatar: '', // base64 or URL
  instagram: '@frameandsoul',
  youtube: 'Frame & Soul',
  vimeo: 'frameandsoul',
};

export const DEFAULT_SERVICES = [
  {
    id: 'svc1',
    icon: '🎬',
    title: 'Brand Films',
    desc: 'Cinematic short films that embody your brand identity and captivate audiences across every platform.',
  },
  {
    id: 'svc2',
    icon: '📽',
    title: 'Commercial Production',
    desc: 'High-impact advertisements and product films that convert viewers into customers.',
  },
  {
    id: 'svc3',
    icon: '🎞',
    title: 'Documentary',
    desc: 'Long-form storytelling that unearths truth, emotion, and the human experience.',
  },
  {
    id: 'svc4',
    icon: '✂️',
    title: 'Post-Production',
    desc: 'Color grading, sound design, and editing that transform raw footage into a masterpiece.',
  },
];

// ─── LocalStorage Keys ───────────────────────────────────────────────────────
const PROFILE_KEY = 'vs_profile';
const VIDEOS_KEY  = 'vs_videos';
const AUTH_KEY    = 'vs_auth';

// ─── Auth ────────────────────────────────────────────────────────────────────
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

export const authLogin = (username, password) => {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const authLogout = () => sessionStorage.removeItem(AUTH_KEY);
export const isAuthenticated = () => sessionStorage.getItem(AUTH_KEY) === 'true';

// ─── Profile CRUD ────────────────────────────────────────────────────────────
export const getProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveProfile = (data) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
};

// ─── Videos CRUD ─────────────────────────────────────────────────────────────
export const getVideos = () => {
  try {
    const raw = localStorage.getItem(VIDEOS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveVideos = (videos) => {
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(videos));
};

export const addVideo = (video) => {
  const videos = getVideos();
  const newVideo = { ...video, id: Date.now().toString(), createdAt: new Date().toISOString() };
  videos.unshift(newVideo);
  saveVideos(videos);
  return newVideo;
};

export const deleteVideo = (id) => {
  const videos = getVideos().filter(v => v.id !== id);
  saveVideos(videos);
};

export const updateVideo = (id, updates) => {
  const videos = getVideos().map(v => v.id === id ? { ...v, ...updates } : v);
  saveVideos(videos);
};
