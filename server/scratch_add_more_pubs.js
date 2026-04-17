const mongoose = require('mongoose');
const Publication = require('./src/models/Publication');
const Team = require('./src/models/Team');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('Connected to DB');

        const teamId = '69e1ff45f2bc4a71d16726e5';

        const extraPublications = [
            {
                title: "test lorem test",
                authors: ["oualidlafdal50@gmail.com", "walidbusiness50@gmail.com", "walidbusiness10@gmail.com", "wwalidlaf@gmail.com"],
                year: 2026,
                publisher: "Institutional Lab",
                contribution: "Initial test for research publication lifecycle and team collaboration verification.",
                abstract: "test lorem test abstract content for architectural validation.",
                tags: ["deep learning", "machine learning", "ai test"],
                team: teamId,
                views: 45
            },
            {
                title: "Scalable Federated Learning for Privacy-Preserving Medical Imaging Analytics",
                authors: ["A. Mansouri", "S. Dahlab", "H. Khelifi"],
                year: 2025,
                publisher: "AI in Medicine Journal",
                contribution: "Introduced a novel decentralized aggregation protocol that reduces communication overhead by 40% while maintaining differential privacy.",
                abstract: "Federated learning has emerged as a key paradigm for privacy-conscious data analysis. We propose a scalable framework specifically tailored for large-scale medical imaging.",
                tags: ["Federated Learning", "Privacy", "Healthcare AI"],
                team: teamId,
                views: 520
            },
            {
                title: "Autonomous Path Planning in Highly Dynamic Environments using Transformer networks",
                authors: ["Y. Benali", "M. Zahra"],
                year: 2024,
                publisher: "Robotics and Autonomous Systems",
                contribution: "Developed a transformer-based spatial encoder that predicts obstacle trajectories with sub-centimeter precision.",
                abstract: "Traditional path planning often fails in crowded spaces. Our transformer approach leverages temporal attention to navigate dynamic obstacles smoothly.",
                tags: ["Robotics", "Autonomous Systems", "Transformers"],
                team: teamId,
                views: 840
            }
        ];

        for (const pub of extraPublications) {
            // Check if exists
            const exists = await Publication.findOne({ title: pub.title, team: teamId });
            if (!exists) {
                await Publication.create(pub);
                console.log(`Created: ${pub.title}`);
            } else {
                console.log(`Skipped (already exists): ${pub.title}`);
            }
        }

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
