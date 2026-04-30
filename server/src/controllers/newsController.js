const News = require('../models/News');
const path = require('path');
const fs = require('fs');

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find().populate('team').populate('createdBy', 'username email');
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createNews = async (req, res) => {
    try {
        const { title, description, team } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = `/uploads/news/${req.file.filename}`;
        }

        const finalTeam = req.user.role === 'superadmin' ? team : req.user.team;

        const news = await News.create({
            title,
            description,
            team: finalTeam,
            imageUrl,
            createdBy: req.user._id
        });

        res.status(201).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { title, description, team } = req.body;
        const news = await News.findById(req.params.id);
        
        if (!news) return res.status(404).json({ message: 'News not found' });

        if (req.user.role !== 'superadmin' && news.team?.toString() !== req.user.team?.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this team\'s news' });
        }

        let updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (req.user.role === 'superadmin' && team !== undefined) updateData.team = team;

        if (req.file) {
            updateData.imageUrl = `/uploads/news/${req.file.filename}`;
        }

        const updatedNews = await News.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate('team')
            .populate('createdBy', 'username email');

        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });

        if (req.user.role !== 'superadmin' && news.team?.toString() !== req.user.team?.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this team\'s news' });
        }

        await News.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.incrementViews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
