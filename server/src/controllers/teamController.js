const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
    try {
        const { name, focus, leader, members, activeFilds } = req.body;
        
        // Basic validation
        if (!name || !focus || !leader) {
            return res.status(400).json({ message: 'Name, focus, and leader are required' });
        }

        const User = require('../models/User');

        const existingTeam = await Team.findOne({ name });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team name already exists' });
        }

        const team = new Team({
            name,
            focus,
            leader,
            members,
            activeFilds
        });

        const createdTeam = await team.save();

        // Update members and leader to point to this team
        const allMemberIds = [...new Set([...(members || []), leader])];
        await User.updateMany(
            { _id: { $in: allMemberIds } },
            { team: createdTeam._id }
        );

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
exports.updateTeam = async (req, res) => {
    try {
        const { name, focus, leader, members, activeFilds } = req.body;
        const User = require('../models/User');

        // Get old team to compare members
        const oldTeam = await Team.findById(req.params.id);
        if (!oldTeam) return res.status(404).json({ message: 'Team not found' });

        const team = await Team.findByIdAndUpdate(
            req.params.id,
            { name, focus, leader, members, activeFilds },
            { new: true }
        );

        // Identify removed members
        const oldMemberIds = [...new Set([...(oldTeam.members || []).map(m => m.toString()), oldTeam.leader.toString()])];
        const newMemberIds = [...new Set([...(members || []).map(m => m.toString()), leader.toString()])];
        
        const removedMemberIds = oldMemberIds.filter(id => !newMemberIds.includes(id));
        const addedMemberIds = newMemberIds.filter(id => !oldMemberIds.includes(id));

        // Clear team for removed members
        if (removedMemberIds.length > 0) {
            await User.updateMany(
                { _id: { $in: removedMemberIds } },
                { team: null }
            );
        }

        // Set team for added members
        if (addedMemberIds.length > 0) {
            await User.updateMany(
                { _id: { $in: addedMemberIds } },
                { team: team._id }
            );
        }

        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const User = require('../models/User');
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        // Clear team field for all users who were in this team
        await User.updateMany(
            { team: req.params.id },
            { team: null }
        );

        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
