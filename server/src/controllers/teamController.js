const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
    try {
        const { name, focus, leader, members, activeProjects } = req.body;
        
        // Basic validation
        if (!name || !focus || !leader) {
            return res.status(400).json({ message: 'Name, focus, and leader are required' });
        }

        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team name already exists' });
        }

        const team = new Team({
            name,
            focus,
            leader,
            members,
            activeProjects
        });

        const createdTeam = await team.save();
        res.status(201).json(createdTeam);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find()
            .populate('leader', 'username email')
            .populate('members', 'username email role');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
