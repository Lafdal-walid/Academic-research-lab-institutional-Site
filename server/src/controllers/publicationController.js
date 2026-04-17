const Publication = require('../models/Publication');
const path = require('path');

exports.createPublication = async (req, res) => {
    try {
        const { title, authors, year, publisher, abstract, contribution, field, members, team, project } = req.body;
        
        let documentUrl = '';
        if (req.file) {
            documentUrl = `/uploads/publications/${req.file.filename}`;
        }

        const memberList = Array.isArray(members) ? members : members ? members.split(',').map(m => m.trim()) : [];
        
        const publication = await Publication.create({
            title,
            authors: memberList, // authors are the same as members
            year: year || new Date().getFullYear(),
            publisher: publisher || 'Institutional Lab',
            abstract,
            contribution,
            field,
            members: memberList,
            team: req.user.team || null, // set team from authenticated user
            project: project || null,
            documentUrl
        });

        res.status(201).json(publication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPublications = async (req, res) => {
    try {
        const publications = await Publication.find()
            .populate('team')
            .populate('project');
        res.json(publications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);
        if (!publication) return res.status(404).json({ message: 'Publication not found' });
        
        await publication.deleteOne();
        res.json({ message: 'Publication removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
