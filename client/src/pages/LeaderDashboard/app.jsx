import { Routes, Route } from 'react-router-dom';
import Users from './Users/Users';
import ProjectHub from './ProjectHub/ProjectHub';
import Notifications from './Notifications/Notifications';
import ManageContent from './ManageContent/ManageContent';
import TeamContact from './TeamContact/TeamContact';
import AdminTools from './AdminTools/AdminTools';

const LeaderApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="project-hub" element={<ProjectHub />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="manage-content" element={<ManageContent />} />
      <Route path="team-contact" element={<TeamContact />} />
      <Route path="admin-tools" element={<AdminTools />} />
    </Routes>
  );
};

export default LeaderApp;
