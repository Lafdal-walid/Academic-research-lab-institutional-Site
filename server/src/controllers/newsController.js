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
    console.log('--- Create News Request ---');
    console.log('Body:', req.body);
    console.log('File:', req.file);
    try {
        const { title, description, team } = req.body;
        let imageUrl = '';

        if (req.file) {
            imageUrl = `/uploads/news/${req.file.filename}`;
        }

        const news = await News.create({
            title,
            description,
            team,
            imageUrl,
            createdBy: req.user._id
        });

        console.log('News created successfully:', news._id);
        res.status(201).json(news);
    } catch (error) {
        console.error('Create News Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const { title, description, team } = req.body;
        let updateData = { title, description, team };

        if (req.file) {
            updateData.imageUrl = `/uploads/news/${req.file.filename}`;
        }

        const news = await News.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate('team')
            .populate('createdBy', 'username email');

        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
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
