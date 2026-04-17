const mongoose = require('mongoose');
require('dotenv').config();
const Publication = require('./src/models/Publication');
const Project = require('./src/models/Project');
const Team = require('./src/models/Team');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    try {
        let defaultProject = await Project.findOne();
        if (!defaultProject) {
            defaultProject = await Project.create({
                title: "Ai Saad Dahlab Project",
                description: "Default ai project",
                status: "In Progress",
                startDate: new Date(),
                department: "Computer Science"
            });
        }
        
        let defaultTeam = await Team.findOne();
        if (!defaultTeam) {
            defaultTeam = await Team.create({
                name: "AI Dev Team",
                description: "AI Team"
            });
        }

        const res = await Publication.updateMany(
            { project: { $exists: false } },
            { $set: { project: defaultProject._id, team: defaultTeam._id, status: 'Waiting ...' } }
        );
        
        const res2 = await Publication.updateMany(
            { project: null },
            { $set: { project: defaultProject._id, team: defaultTeam._id, status: 'Waiting ...' } }
        );
        
        console.log("Updated missing projects", res.modifiedCount, res2.modifiedCount);
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
});
