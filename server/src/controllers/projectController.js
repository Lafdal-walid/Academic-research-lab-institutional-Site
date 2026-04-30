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

exports.toggleMilestone = async (req, res) => {
    try {
        const { id, milestoneId } = req.params;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const milestone = project.milestones.id(milestoneId);
        if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

        milestone.completed = !milestone.completed;
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        let query = {};
        
        // If team ID is provided in query, filter by team (Public access allowed for this)
        if (req.query.team) {
            query.team = req.query.team;
        } 
        // Otherwise, if user is authenticated, handle dashboard filtering
        else if (req.user) {
            // Only superadmin sees all projects. 
            // Admin and regular users see their own team's projects and projects they are members of.
            if (req.user.role !== 'superadmin') {
                query = {
                    $or: [
                        { members: req.user._id },
                        { team: req.user.team }
                    ]
                };
            }
        }
        
        const projects = await Project.find(query).populate('team').populate('members');
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

        // Only superadmin can assign a project to an arbitrary team. 
        // Admins and regular users must use their own team.
        const finalTeam = req.user.role === 'superadmin' ? (team || req.user.team) : req.user.team;

        const project = await Project.create({
            title,
            description,
            team: finalTeam,
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

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, team, leader, members, status, startDate, endDate } = req.body;
        
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (req.user.role === 'superadmin' && team) updateData.team = team;
        if (leader) updateData.leader = leader;
        if (members) updateData.members = typeof members === 'string' ? members.split(',').filter(m => m) : members;
        if (status) updateData.status = status;
        if (startDate) updateData.startDate = startDate;
        if (endDate) updateData.endDate = endDate;

        if (req.file) {
            updateData.imageUrl = `/uploads/projects/${req.file.filename}`;
        }

        const project = await Project.findByIdAndUpdate(id, updateData, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateMilestone = async (req, res) => {
    try {
        const { id, milestoneId } = req.params;
        const { title, date } = req.body;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const milestone = project.milestones.id(milestoneId);
        if (!milestone) return res.status(404).json({ message: 'Milestone not found' });

        if (title) milestone.title = title;
        if (date) milestone.date = date;
        
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMilestone = async (req, res) => {
    try {
        const { id, milestoneId } = req.params;
        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.milestones.pull(milestoneId);
        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
