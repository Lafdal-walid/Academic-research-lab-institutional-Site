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
            // If the user has a team, only show reports from that team
            const user = await User.findById(req.user._id);
            if (user && user.team) {
                const teamUsers = await User.find({ team: user.team }).select('_id');
                const userIds = teamUsers.map(u => u._id);
                query.user = { $in: userIds };
            } else {
                // If no team, only show their own reports
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
        const report = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
