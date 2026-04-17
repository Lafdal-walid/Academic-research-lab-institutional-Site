const express = require('express');
const router = express.Router();
const { createTeam, getAllTeams } = require('../controllers/teamController');
const { protect } = require('../midddlewares/authMiddleware');

router.post('/', protect, createTeam);
router.get('/', protect, getAllTeams);

module.exports = router;
