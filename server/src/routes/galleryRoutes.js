const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createGalleryItem, getGalleryItems, deleteGalleryItem, incrementViews } = require('../controllers/galleryController');
const { protect } = require('../midddlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/gallery';
        if (!require('fs').existsSync(dir)) require('fs').mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/', protect, upload.single('image'), createGalleryItem);
router.get('/', getGalleryItems);
router.delete('/:id', protect, deleteGalleryItem);
router.patch('/:id/view', incrementViews);

module.exports = router;
