import { Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import Home from './Home/Home';
import Projects from './Projects/Projects';
import Publications from './Publications/Publications';
import TeamsResearches from './TeamsResearches/TeamsResearches';
import AboutUs from './AboutUs/AboutUs';
import Support from './Support/Support';
import NewsGallery from './NewsGallery/NewsGallery';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Forget from '../Auth/Forget';
import Confirmforget from '../Auth/Confirmforget';

const MainApp = () => {
  const location = useLocation();
  const noLayoutPaths = ['/login', '/register', '/forget', '/confirm-forget'];
  // Check if matched path (ignoring trailing slashes) is in noLayoutPaths
  const isNoLayout = noLayoutPaths.some(path => location.pathname.endsWith(path));

  const content = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="publications" element={<Publications />} />
      <Route path="teams-researches" element={<TeamsResearches />}>
        <Route path="member/:memberId" element={<TeamsResearches />} />
      </Route>
      <Route path="about-us" element={<AboutUs />} />
      <Route path="news-gallery" element={<NewsGallery />} />
      <Route path="support" element={<Support />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forget" element={<Forget />} />
      <Route path="confirm-forget" element={<Confirmforget />} />
    </Routes>
  );

  if (isNoLayout) {
    return content;
  }

  return <MainLayout>{content}</MainLayout>;
};

export default MainApp;
