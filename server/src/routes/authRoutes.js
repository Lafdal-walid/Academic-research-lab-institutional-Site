const express = require('express');
const router = express.Router();
const { register, registerLater, googleLogin, login, getProfile, getAllUsers, requestPhoneOtp, verifyPhoneOtp, requestEmailOtp, verifyEmailOtp } = require('../controllers/authController');
const { protect } = require('../midddlewares/authMiddleware');

// OTP Routes for 2-step verification
router.post('/send-phone-otp', requestPhoneOtp);
router.post('/verify-phone-otp', verifyPhoneOtp);
router.post('/send-email-otp', requestEmailOtp);
router.post('/verify-email-otp', verifyEmailOtp);

router.post('/register', register);
router.post('/register-later', registerLater);
router.post('/google-login', googleLogin);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.get('/admin/users', protect, getAllUsers);

module.exports = router;
