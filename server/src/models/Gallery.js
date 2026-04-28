const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: [true, 'Image is required']
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    category: {
        type: String,
        enum: ['Research', 'Events', 'Visits', 'General'],
        default: 'General'
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
