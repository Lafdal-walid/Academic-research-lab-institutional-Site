const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    audienceType: {
        type: String,
        enum: ['teams', 'filters'],
        default: 'teams'
    },
    team: {
        type: String,
        default: 'All Teams'
    },
    specificUsers: [{
        type: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    lastUsed: {
        type: Date,
        default: Date.now
    },
    scheduledAt: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
