const mongoose = require('mongoose');
const Project = require('./src/models/Project');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to DB');
        
        // Update Project 1
        await Project.findOneAndUpdate(
            { title: /project 1/i },
            { status: 'Ongoing' }
        );
        console.log('Updated Project 1 to Ongoing');

        // Update Project 2
        await Project.findOneAndUpdate(
            { title: /project 2/i },
            { status: 'Suspended' }
        );
        console.log('Updated Project 2 to Suspended');

        // Update Project 3
        await Project.findOneAndUpdate(
            { title: /project 3/i },
            { status: 'Completed' }
        );
        console.log('Updated Project 3 to Completed');

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
