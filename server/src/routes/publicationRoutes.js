const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createPublication, getPublications, deletePublication, updatePublicationStatus, incrementViews } = require('../controllers/publicationController');
const { protect } = require('../midddlewares/authMiddleware');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/publications');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|doc|docx/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Word or PDF Documents Only!');
        }
    }
});

router.post('/', protect, upload.single('document'), createPublication);
router.get('/', getPublications);
router.patch('/:id/status', protect, updatePublicationStatus);
router.patch('/:id/view', incrementViews);
router.delete('/:id', protect, deletePublication);

module.exports = router;
