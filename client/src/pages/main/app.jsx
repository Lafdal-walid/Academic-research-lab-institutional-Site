import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import Home from './Home/Home';
import Projects from './Projects/Projects';
import Publications from './Publications/Publications';
import TeamsResearches from './TeamsResearches/TeamsResearches';
import AboutUs from './AboutUs/AboutUs';
import Support from './Support/Support';

const MainApp = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="publications" element={<Publications />} />
        <Route path="teams-researches" element={<TeamsResearches />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="support" element={<Support />} />
      </Routes>
    </MainLayout>
  );
};

export default MainApp;
