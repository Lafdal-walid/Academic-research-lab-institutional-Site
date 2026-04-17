const mongoose = require('mongoose');
const Publication = require('./src/models/Publication');
const Team = require('./src/models/Team');
const Project = require('./src/models/Project');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to DB');

        // Clear only the test/walid publications
        await Publication.deleteMany({ title: /walid|test/i });
        console.log('Cleared test publications');

        // Find Team
        const team = await Team.findOne();
        const teamId = team ? team._id : null;

        // Find Projects
        const proj1 = await Project.findOne({ title: /project 1/i });
        const proj2 = await Project.findOne({ title: /project 2/i });

        const publications = [
            {
                title: "Attention Mechanisms in Hierarchical Cognitive Architectures for Multi-Agent Reasoning",
                authors: ["A. Benali", "S. Mansouri", "Y. Kaddour"],
                year: 2024,
                publisher: "IEEE Transactions on Neural Networks and Learning Systems",
                abstract: "We propose a hierarchical attention-based cognitive architecture that enables multi-agent systems to perform coordinated reasoning tasks with significantly improved accuracy and convergence rates.",
                tags: ["Vision-Machine Intelligence", "Multi-Agent Systems"],
                team: teamId,
                project: proj1 ? proj1._id : null,
                pdfLink: "https://ieeexplore.ieee.org/",
                views: 1240
            },
            {
                title: "Dynamic Resource Allocation in Distributed Cloud Networks using Deep Reinforcement Learning",
                authors: ["M. Zahra", "K. Omar"],
                year: 2023,
                publisher: "Journal of Network and Computer Applications",
                abstract: "This paper explores the integration of DRL for managing network resources in real-time, focusing on latency reduction and energy efficiency in large-scale deployments.",
                tags: ["Deep Learning", "Cloud Computing"],
                team: teamId,
                project: proj2 ? proj2._id : null,
                pdfLink: "https://www.sciencedirect.com/",
                views: 890
            }
        ];

        for (const pub of publications) {
            await Publication.create(pub);
            console.log(`Created: ${pub.title}`);
        }

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
