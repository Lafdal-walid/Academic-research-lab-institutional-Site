const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createReport, getReports, updateReport } = require('../controllers/reportController');
const { protect } = require('../midddlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/reports');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /pdf|png|jpg|jpeg/;
        const extname = allowed.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowed.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb('Error: PNG, JPG, or PDF only!');
    }
});

router.post('/', protect, upload.single('benchmarkFile'), createReport);
router.get('/', getReports);
router.put('/:id', protect, updateReport);

module.exports = router;
