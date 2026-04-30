import { Routes, Route } from 'react-router-dom';
import Layoutleader from './Layoutleader';
import Users from './Users/Users';
import ProjectHub from './ProjectHub/ProjectHub';
import Notifications from './Notifications/Notifications';
import ManageContent from './ManageContent/ManageContent';
import ManageNewsGallery from './ManageNewsGallery/ManageNewsGallery';
import TeamContact from './TeamContact/TeamContact';
import AdminTools from './AdminTools/AdminTools';

import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const LeaderApp = () => {
  const { user } = useAuth();
  const isSuper = user?.role === 'superadmin';

  return (
    <Layoutleader>
      <Routes>
        <Route path="/" element={isSuper ? <Users /> : <Navigate to="project-hub" replace />} />
        <Route path="project-hub" element={<ProjectHub />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="manage-content" element={<ManageNewsGallery />} />
        <Route path="team-contact" element={<TeamContact />} />
        <Route path="admin-tools" element={isSuper ? <AdminTools /> : <Navigate to="project-hub" replace />} />
      </Routes>
    </Layoutleader>
  );
};

export default LeaderApp;
