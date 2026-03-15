import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cursor        from './components/Cursor';
import Portfolio     from './pages/Portfolio';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <Routes>
        <Route path="/"          element={<Portfolio />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
