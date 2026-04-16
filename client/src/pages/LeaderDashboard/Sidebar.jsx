import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SidebarCommon from '../usersdashboard/SidebarCommon';

import iconUsers from '@/assets/svg/LeaderDashboard/sidebar/users-alt (5) 2.svg';
import iconProjectHub from '@/assets/svg/LeaderDashboard/sidebar/Vector.svg';
import iconNotifications from '@/assets/svg/LeaderDashboard/sidebar/Group 58.svg';
import iconManageContent from '@/assets/svg/LeaderDashboard/sidebar/web-design 1.svg';
import iconTeamContact from '@/assets/svg/LeaderDashboard/sidebar/user-headset (2) 1.svg';
import iconAdminTools from '@/assets/svg/LeaderDashboard/sidebar/settings 1.svg';

const Sidebar = ({ isSidebarOpen = true }) => {
  const { language } = useLanguage();

  const navItems = useMemo(
    () => [
      { id: 'users', path: '/leaderdashboard', icon: <img src={iconUsers} alt="Users" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} />, label: 'Users' },
      { id: 'project-hub', path: '/leaderdashboard/project-hub', icon: <img src={iconProjectHub} alt="Project Hub" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} />, label: 'Project Hub' },
      { id: 'notifications', path: '/leaderdashboard/notifications', icon: <img src={iconNotifications} alt="Notifications" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} />, label: 'Notifications' },
      { id: 'manage-content', path: '/leaderdashboard/manage-content', icon: <img src={iconManageContent} alt="Manage Content" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} />, label: 'Manage Content' },
      { id: 'team-contact', path: '/leaderdashboard/team-contact', icon: <img src={iconTeamContact} alt="Team Contact" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} />, label: 'Team Contact' },
      { id: 'admin-tools', path: '/leaderdashboard/admin-tools', icon: <img src={iconAdminTools} alt="Admin Tools" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} />, label: 'Admin Tools' },
    ],
    []
  );

  return <SidebarCommon items={navItems} isSidebarOpen={isSidebarOpen} />;
};

export default React.memo(Sidebar);
