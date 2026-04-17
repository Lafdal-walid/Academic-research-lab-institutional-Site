const express = require('express');
const router = express.Router();
const { createTeam, getAllTeams, updateTeam, deleteTeam } = require('../controllers/teamController');
const { protect } = require('../midddlewares/authMiddleware');

router.post('/', protect, createTeam);
router.get('/', getAllTeams); // Everyone can see teams
router.put('/:id', protect, updateTeam);
router.delete('/:id', protect, deleteTeam);

module.exports = router;
