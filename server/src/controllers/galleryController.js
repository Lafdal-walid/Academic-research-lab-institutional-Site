const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

exports.createGalleryItem = async (req, res) => {
    try {
        const { title, team, project, category } = req.body;
        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/gallery/${req.file.filename}`;
        } else {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const galleryItem = await Gallery.create({
            title,
            imageUrl,
            team: team || null,
            project: project || null,
            category: category || 'General',
            uploadedBy: req.user._id
        });

        res.status(201).json(galleryItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGalleryItems = async (req, res) => {
    try {
        const query = {};
        if (req.query.team) query.team = req.query.team;
        if (req.query.project) query.project = req.query.project;
        if (req.query.category) query.category = req.query.category;

        const items = await Gallery.find(query)
            .populate('team', 'name')
            .populate('project', 'title')
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        // Delete file from filesystem
        if (item.imageUrl) {
            const filePath = path.join(__dirname, '../../', item.imageUrl);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.incrementViews = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!item) return res.status(404).json({ message: 'Gallery item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
