import { Routes, Route } from 'react-router-dom';
import Overview from './Overview/Overview';
import PhdTracker from './PhdTracker/PhdTracker';
import MyPublications from './MyPublications/MyPublications';
import Progress from './Progress/Progress';
import Notifications from './Notifications/Notifications';
import TeamContact from './TeamContact/TeamContact';
import MyAccount from './MyAccount/MyAccount';

const UserApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="phd-tracker" element={<PhdTracker />} />
      <Route path="my-publications" element={<MyPublications />} />
      <Route path="progress" element={<Progress />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="team-contact" element={<TeamContact />} />
      <Route path="my-account" element={<MyAccount />} />
    </Routes>
  );
};

export default UserApp;
