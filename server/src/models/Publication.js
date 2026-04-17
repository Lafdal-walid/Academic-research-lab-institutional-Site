const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    authors: [{
        type: String,
        required: true
    }],
    year: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    pdfLink: {
        type: String,
        trim: true
    },
    documentUrl: {
        type: String,
        trim: true
    },
    abstract: {
        type: String,
        trim: true
    },
    contribution: {
        type: String,
        trim: true
    },
    field: {
        type: String,
        trim: true
    },
    members: [{
        type: String
    }],
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    tags: [{
        type: String
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, { timestamps: true });

// For search optimization
publicationSchema.index({ title: 'text', authors: 'text', tags: 'text' });

module.exports = mongoose.model('Publication', publicationSchema);
