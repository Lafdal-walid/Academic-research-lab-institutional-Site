const mongoose = require('mongoose');
const Project = require('./src/models/Project');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const allProjects = await Project.find();
        console.log('--- ALL PROJECTS STATUSES ---');
        allProjects.forEach(p => console.log(`${p.title}: ${p.status}`));
        
        const projectStats = {
            total: allProjects.length,
            completed: allProjects.filter(p => p.status === 'Completed').length,
            canceled: allProjects.filter(p => p.status === 'Suspended').length,
            ongoing: allProjects.filter(p => p.status === 'Ongoing' || p.status === 'Proposed').length,
        };
        console.log('--- CALCULATED STATS ---');
        console.log(JSON.stringify(projectStats, null, 2));
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
