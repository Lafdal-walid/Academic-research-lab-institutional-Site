const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Publication title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Publication description (abstract) is required']
    },
    content: {
        type: String
    },
    authors: [{
        type: String,
        required: [true, 'At least one author is required']
    }],
    publishedDate: {
        type: Date,
        required: [true, 'Publication date is required'],
        default: Date.now
    },
    publisher: {
        type: String,
        required: [true, 'Publisher/Journal name is required'],
        default: 'Institutional Research Lab'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: [true, 'Associated research team is required']
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Associated project is required']
    },
    activeFilds: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    pdfLink: {
        type: String,
        trim: true
    },
    documentUrl: {
        type: String,
        trim: true
    },
    views: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Waiting', 'Approved', 'Rejected'],
        default: 'Waiting'
    }
}, { timestamps: true });

// For search optimization
publicationSchema.index({ title: 'text', authors: 'text', tags: 'text', activeFilds: 'text' });

module.exports = mongoose.model('Publication', publicationSchema);
