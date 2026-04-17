const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, deleteNotification, updateNotification, getMyNotifications } = require('../controllers/notificationController');
const { protect } = require('../midddlewares/authMiddleware');

router.get('/', getNotifications);
router.get('/my', protect, getMyNotifications);
router.post('/', protect, createNotification);
router.put('/:id', protect, updateNotification);
router.delete('/:id', protect, deleteNotification);

module.exports = router;
