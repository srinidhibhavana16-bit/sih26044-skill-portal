const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

// Get student profile
router.get('/profile', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.userId }).populate('targetRole');
    if (!student) {
      return res.status(404).json({ error: 'Student profile not found' });
    }
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile: ' + err.message });
  }
});

// Update basic info
router.put('/profile', auth, authorize('student'), async (req, res) => {
  try {
    const { headline, bio } = req.body;
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { headline, bio, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile: ' + err.message });
  }
});

// Add education
router.post('/education', auth, authorize('student'), async (req, res) => {
  try {
    const { degree, institution, startDate, endDate, cgpa, description } = req.body;
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: {
          education: { degree, institution, startDate, endDate, cgpa, description }
        },
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add education: ' + err.message });
  }
});

// Update education
router.put('/education/:id', auth, authorize('student'), async (req, res) => {
  try {
    const { degree, institution, startDate, endDate, cgpa, description } = req.body;
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId, 'education._id': req.params.id },
      {
        $set: {
          'education.$.degree': degree,
          'education.$.institution': institution,
          'education.$.startDate': startDate,
          'education.$.endDate': endDate,
          'education.$.cgpa': cgpa,
          'education.$.description': description,
          updatedAt: Date.now()
        }
      },
      { new: true }
    );
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update education: ' + err.message });
  }
});

// Delete education
router.delete('/education/:id', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { education: { _id: req.params.id } }, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete education: ' + err.message });
  }
});

// Add experience
router.post('/experience', auth, authorize('student'), async (req, res) => {
  try {
    const { jobTitle, company, duration, description, startDate, endDate } = req.body;
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: { experience: { jobTitle, company, duration, description, startDate, endDate } },
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add experience: ' + err.message });
  }
});

// Delete experience
router.delete('/experience/:id', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { experience: { _id: req.params.id } }, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete experience: ' + err.message });
  }
});

// Add project
router.post('/projects', auth, authorize('student'), async (req, res) => {
  try {
    const { title, description, skills, link, startDate, endDate } = req.body;
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: { projects: { title, description, skills, link, startDate, endDate } },
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project: ' + err.message });
  }
});

// Delete project
router.delete('/projects/:id', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { projects: { _id: req.params.id } }, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project: ' + err.message });
  }
});

// Add certification
router.post('/certifications', auth, authorize('student'), async (req, res) => {
  try {
    const { name, provider, issueDate, expiryDate, link } = req.body;
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: { certifications: { name, provider, issueDate, expiryDate, link } },
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add certification: ' + err.message });
  }
});

// Delete certification
router.delete('/certifications/:id', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { certifications: { _id: req.params.id } }, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete certification: ' + err.message });
  }
});

// Add skill
router.post('/skills', auth, authorize('student'), async (req, res) => {
  try {
    const { name, level = 'beginner' } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Skill name is required' });
    }

    const existingStudent = await Student.findOne({ userId: req.user.userId });
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student profile not found' });
    }
    if (existingStudent.skills.some((skill) => skill.name.toLowerCase() === name.trim().toLowerCase())) {
      return res.status(400).json({ error: 'This skill is already on your profile' });
    }

    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      {
        $push: { skills: { name: name.trim(), level, evidence: [], endorsements: 0 } },
        updatedAt: Date.now()
      },
      { new: true }
    );
    res.status(201).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add skill: ' + err.message });
  }
});

// Delete skill
router.delete('/skills/:id', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { $pull: { skills: { _id: req.params.id } }, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ success: true, student });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete skill: ' + err.message });
  }
});

module.exports = router;
