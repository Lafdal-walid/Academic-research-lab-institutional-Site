const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    document: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'In Progress'
    },
    dateTimeString: {
        type: String
    },
    fileUrl: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
