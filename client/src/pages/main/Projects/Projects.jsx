import React, { useState } from 'react';
import Welcome from './Welcome';
import ProjectCatalog from './ProjectCatalog';
import RoadmapSection from '../../../components/RoadmapSection';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
    return (
        <main className="w-full min-h-screen bg-[#0A070E]">
            <Welcome />
            <ProjectCatalog setSelectedProject={setSelectedProject} />
        <RoadmapSection project={selectedProject} />
        </main>
    );
};

export default Projects;
