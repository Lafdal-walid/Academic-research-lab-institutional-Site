const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Proposed', 'Ongoing', 'Completed', 'Suspended'],
        default: 'Proposed'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    timeline: [{
        phase: { type: String, required: true },
        date: { type: Date, required: true },
        description: { type: String },
        completed: { type: Boolean, default: false }
    }],
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    imageUrl: {
        type: String,
        trim: true
    },
    milestones: [{
        title: { type: String, required: true },
        date: { type: String },
        completed: { type: Boolean, default: false }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
