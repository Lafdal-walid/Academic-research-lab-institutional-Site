const Project = require('../models/Project');

exports.addMilestone = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date } = req.body;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.milestones.push({ title, date, completed: false });
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        // Fetch projects where the user is a member or part of the team
        const projects = await Project.find({
            $or: [
                { members: req.user._id },
                { team: req.user.team }
            ]
        }).populate('team');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { title, description, team, members, timeline, startDate, endDate } = req.body;
        
        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/projects/${req.file.filename}`;
        }

        const project = await Project.create({
            title,
            description,
            team: team || req.user.team,
            members: typeof members === 'string' ? members.split(',').filter(m => m) : members,
            timeline: typeof timeline === 'string' ? JSON.parse(timeline) : timeline,
            startDate: startDate || Date.now(),
            endDate: endDate || null,
            imageUrl
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
