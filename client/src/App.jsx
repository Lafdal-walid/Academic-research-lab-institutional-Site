import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Importing sub-apps for routing
import MainApp from './pages/main/app';
import UserDashboardApp from './pages/usersdashboard/app';
import LeaderDashboardApp from './pages/LeaderDashboard/app';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* User Dashboard Routes */}
            <Route path="/usersdashboard/*" element={<UserDashboardApp />} />

            {/* Leader Dashboard Routes */}
            <Route path="/leaderdashboard/*" element={<LeaderDashboardApp />} />

            {/* Main Routes */}
            <Route path="/*" element={<MainApp />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
