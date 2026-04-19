import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Importing sub-apps for routing
import MainApp from './pages/main/app';
import UserDashboardApp from './pages/usersdashboard/app';
import LeaderDashboardApp from './pages/LeaderDashboard/app';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            {/* User Dashboard Routes - Restricted to 'user' role */}
            <Route 
              path="/usersdashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboardApp />
                </ProtectedRoute>
              } 
            />

            {/* Leader Dashboard Routes - Restricted to 'admin' and 'superadmin' roles */}
            <Route 
              path="/leaderdashboard/*" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                  <LeaderDashboardApp />
                </ProtectedRoute>
              } 
            />

            {/* Main Routes */}
            <Route path="/*" element={<MainApp />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
