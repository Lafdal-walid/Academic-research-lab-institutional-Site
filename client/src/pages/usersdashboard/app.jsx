import { Routes, Route } from 'react-router-dom';
import Layoutuser from './Layoutuser';
import Overview from './Overview/Overview';
import PhdTracker from './PhdTracker/PhdTracker';
import MyPublications from './MyPublications/MyPublications';
import Progress from './Progress/Progress';
import Notifications from './Notifications/Notifications';
import TeamContact from './TeamContact/TeamContact';
import MyAccount from './MyAccount/MyAccount';
import NotFound from '../main/NotFound';

// Placeholders for new pages
const Placeholder = ({ name }) => (
  <div className="p-8 bg-[#1a191d] rounded-2xl border border-white/5">
    <h2 className="text-2xl font-bold mb-4">{name}</h2>
    <p className="text-white/60">This page is currently under development.</p>
  </div>
);

const UserApp = () => {
  return (
    <Layoutuser>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="overview" element={<Overview />} />
        <Route path="phd-tracker" element={<PhdTracker />} />
        <Route path="my-publications" element={<MyPublications />} />
        <Route path="progress" element={<Progress />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="team-contact" element={<TeamContact />} />
        <Route path="account/*" element={<MyAccount />} />
        <Route path="billing" element={<Placeholder name="Billing & Plans" />} />
        <Route path="invite" element={<Placeholder name="Invite & Earn" />} />
        <Route path="giveaways" element={<Placeholder name="Giveaways" />} />
        <Route path="coupons" element={<Placeholder name="Coupons" />} />
        <Route path="support" element={<Placeholder name="Support Team" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layoutuser>
  );
};

export default UserApp;
