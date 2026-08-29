const express = require('express');
const router = express.Router();
const CareerRole = require('../models/CareerRole');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

// Get all career roles
router.get('/', async (req, res) => {
  try {
    const roles = await CareerRole.find();
    res.json({ success: true, roles });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch career roles: ' + err.message });
  }
});

// Get specific career role
router.get('/:id', async (req, res) => {
  try {
    const role = await CareerRole.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Career role not found' });
    }
    res.json({ success: true, role });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch career role: ' + err.message });
  }
});

// Student selects target role
router.post('/select/:id', auth, authorize('student'), async (req, res) => {
  try {
    const role = await CareerRole.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Career role not found' });
    }

    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { targetRole: role._id, updatedAt: Date.now() },
      { new: true }
    ).populate('targetRole');

    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to select career role: ' + err.message });
  }
});

module.exports = router;
