import { useState } from 'react';
import { isAuthenticated } from '../data/store';
import Login    from '../dashboard/Login';
import Dashboard from '../dashboard/Dashboard';

export default function DashboardPage() {
  const [authed, setAuthed] = useState(isAuthenticated);

  if (!authed) {
    return <Login onLogin={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}
