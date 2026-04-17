import React from 'react';
import Welcome from './Welcome';
import ProjectCatalog from './ProjectCatalog';

const Projects = () => {
    return (
        <main className="w-full min-h-screen bg-[#0A070E]">
            <Welcome />
            <ProjectCatalog />
        </main>
    );
};

export default Projects;
