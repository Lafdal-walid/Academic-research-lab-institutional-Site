const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    headline: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String, // URL to the image
        default: ''
    },
    fullStory: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
