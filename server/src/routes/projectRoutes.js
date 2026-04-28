const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getProjects, createProject, addMilestone, updateProject, toggleMilestone, updateMilestone, deleteMilestone } = require('../controllers/projectController');
const { protect } = require('../midddlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/projects');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

router.get('/', getProjects);
router.post('/', protect, upload.single('image'), createProject);
router.put('/:id', protect, upload.single('image'), updateProject);
router.post('/:id/milestones', protect, addMilestone);
router.patch('/:id/milestones/:milestoneId/toggle', protect, toggleMilestone);
router.put('/:id/milestones/:milestoneId', protect, updateMilestone);
router.delete('/:id/milestones/:milestoneId', protect, deleteMilestone);

module.exports = router;
