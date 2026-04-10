import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Importing sub-apps for routing
import MainApp from './pages/main/app';
import UserDashboardApp from './pages/usersdashboard/app';
import LeaderDashboardApp from './pages/LeaderDashboard/app';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Dashboard Routes */}
        <Route path="/userdashboard/*" element={<UserDashboardApp />} />

        {/* Leader Dashboard Routes */}
        <Route path="/leaderdashboard/*" element={<LeaderDashboardApp />} />

        {/* Main Routes */}
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
