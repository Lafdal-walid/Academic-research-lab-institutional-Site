const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: function() { return this.type === 'text'; }
    },
    type: {
        type: String,
        enum: ['text', 'doc'],
        default: 'text'
    },
    fileName: {
        type: String
    },
    fileUrl: {
        type: String
    },
    fileSize: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
