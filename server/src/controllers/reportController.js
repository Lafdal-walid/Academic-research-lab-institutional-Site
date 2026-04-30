const Report = require('../models/Report');
const User = require('../models/User');

exports.createReport = async (req, res) => {
    try {
        const fileUrl = req.file ? `/uploads/reports/${req.file.filename}` : '';
        const report = await Report.create({
            document: req.body.document,
            university: req.body.university,
            dateTimeString: req.body.dateTime,
            user: req.user ? req.user._id : null,
            fileUrl
        });
        await report.populate('user');
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        let query = {};
        
        if (req.query.user) {
            query.user = req.query.user;
        } else if (req.user) {
            // Restriction: Admin can see reports from their own team
            if (req.user.role === 'admin') {
                if (req.user.team) {
                    const teamUsers = await User.find({ team: req.user.team }).select('_id');
                    const userIds = teamUsers.map(u => u._id);
                    query.user = { $in: userIds };
                } else {
                    return res.json([]);
                }
            } else if (req.user.role === 'superadmin') {
                // Superadmin sees everything
                query = {};
            } else {
                // Regular users only see their own reports
                query.user = req.user._id;
            }
        }

        const reports = await Report.find(query).populate('user').sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('user');
        if (!report) return res.status(404).json({ message: 'Report not found' });

        // Restriction: Admin can only update reports from their own team
        if (req.user.role === 'admin') {
            if (!req.user.team || !report.user?.team || report.user.team.toString() !== req.user.team.toString()) {
                return res.status(403).json({ message: 'Access denied: You can only manage reports from your own team' });
            }
        }

        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
