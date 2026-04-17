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
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    tags: [{
        type: String
    }]
}, { timestamps: true });

// For search optimization
publicationSchema.index({ title: 'text', authors: 'text', tags: 'text' });

module.exports = mongoose.model('Publication', publicationSchema);
