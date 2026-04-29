import React, { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SidebarCommon from './SidebarCommon';

import iconOverview from '@/assets/svg/leftbaruser/chart-pie-alt (1) 1.svg';
import iconTracker from '@/assets/svg/leftbaruser/credit-card 1.svg';
import iconPublications from '@/assets/svg/leftbaruser/Vector.svg';
import iconProgress from '@/assets/svg/leftbaruser/chart-simple (2) 1.svg';
import iconNotification from '@/assets/svg/leftbaruser/notificaion.svg';
import iconTeam from '@/assets/svg/leftbaruser/member-list 2.svg';
import iconContact from '@/assets/svg/leftbaruser/user-headset (2) 1.svg';
import iconSettings from '@/assets/svg/leftbaruser/settings 1.svg';

const Sidebar = ({ isSidebarOpen = true, closeSidebar }) => {
  const { language } = useLanguage();

  const navItems = useMemo(
    () => [
      { id: 'overview', path: '/usersdashboard', icon: <img src={iconOverview} alt="Overview" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} /> },
      { id: 'phd-tracker', path: '/usersdashboard/phd-tracker', icon: <img src={iconTracker} alt="PhD Tracker" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} /> },
      { id: 'publications', path: '/usersdashboard/my-publications', icon: <img src={iconPublications} alt="My Publications" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} /> },
      { id: 'progress', path: '/usersdashboard/progress', icon: <img src={iconProgress} alt="Progress" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} /> },
      { id: 'notifications', path: '/usersdashboard/notifications', icon: <img src={iconNotification} alt="Notifications" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} /> },
      { id: 'team-contact', path: '/usersdashboard/team-contact', icon: <img src={iconContact} alt="Team Contact" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} /> },
      { id: 'account', path: '/usersdashboard/account', icon: <img src={iconSettings} alt="Account" className="object-contain brightness-0 invert" style={{ width: '1vw', height: '1vw' }} /> },
    ],
    []
  );

  return <SidebarCommon items={navItems} isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />;
};

export default React.memo(Sidebar);

