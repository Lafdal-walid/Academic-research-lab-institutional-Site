const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getChatList, getConversation, sendMessage } = require('../controllers/messageController');
const { protect } = require('../midddlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get('/list', protect, getChatList);
router.get('/conversation/:otherUserId', protect, getConversation);
router.post('/send', protect, upload.single('file'), sendMessage);

module.exports = router;
