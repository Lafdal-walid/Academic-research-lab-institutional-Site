const Report = require('../models/Report');

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
        const query = req.query.user ? { user: req.query.user } : {};
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
