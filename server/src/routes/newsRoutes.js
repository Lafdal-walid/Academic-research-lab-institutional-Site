const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const { protect } = require('../midddlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/', getAllNews);
router.post('/', protect, upload.single('image'), createNews);
router.put('/:id', protect, upload.single('image'), updateNews);
router.delete('/:id', protect, deleteNews);

module.exports = router;
