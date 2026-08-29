const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const Student = require('../models/Student');
const Company = require('../models/Company');
const { auth, authorize } = require('../middleware/auth');

const applicationStatuses = ['applied', 'shortlisted', 'rejected', 'accepted', 'offer_received', 'offer_accepted'];

// Calculate skill match
function calculateSkillMatch(studentSkills, opportunitySkills) {
  if (!opportunitySkills || opportunitySkills.length === 0) {
    return { matchPercentage: 0, matchedSkills: [], missingSkills: [] };
  }

  const studentSkillNames = studentSkills.map(s => s.name.toLowerCase());
  const matchedSkills = [];
  const missingSkills = [];

  opportunitySkills.forEach(oppSkill => {
    const matched = studentSkillNames.some(
      s => s === oppSkill.name.toLowerCase() || s.includes(oppSkill.name.toLowerCase())
    );
    if (matched) {
      matchedSkills.push(oppSkill.name);
    } else {
      missingSkills.push(oppSkill.name);
    }
  });

  const matchPercentage = Math.round((matchedSkills.length / opportunitySkills.length) * 100);

  return { matchPercentage, matchedSkills, missingSkills };
}

// Apply for opportunity
router.post('/', auth, authorize('student'), async (req, res) => {
  try {
    const { opportunityId, coverLetter } = req.body;
    if (!opportunityId || !require('mongoose').isValidObjectId(opportunityId)) {
      return res.status(400).json({ error: 'A valid opportunityId is required' });
    }

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    if (opportunity.status !== 'open') {
      return res.status(400).json({ error: 'This opportunity is no longer open' });
    }

    const student = await Student.findOne({ userId: req.user.userId });
    if (!student) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      studentId: student._id,
      opportunityId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this opportunity' });
    }

    const skillMatch = calculateSkillMatch(student.skills, opportunity.skills);

    // Create application
    const application = new Application({
      studentId: student._id,
      opportunityId: opportunity._id,
      companyId: opportunity.companyId,
      coverLetter,
      skillMatch: {
        ...skillMatch,
        matchExplanation: `You have ${skillMatch.matchedSkills.length} of ${opportunity.skills.length} required skills. ${skillMatch.missingSkills.length > 0 ? `Skills to develop: ${skillMatch.missingSkills.join(', ')}.` : 'Great match!'}`
      }
    });

    await application.save();

    // Add to student's applications
    student.applications.push(application._id);
    await student.save();

    await Company.findByIdAndUpdate(opportunity.companyId, {
      $addToSet: { applications: application._id }
    });

    // Increment application count
    opportunity.applicationCount += 1;
    await opportunity.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply: ' + err.message });
  }
});

// Get student's applications
router.get('/student', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.userId });
    if (!student) return res.status(404).json({ error: 'Student profile not found' });
    const applications = await Application.find({ studentId: student._id })
      .populate('opportunityId', 'title type')
      .populate('companyId', 'companyName')
      .sort({ applicationDate: -1 });

    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications: ' + err.message });
  }
});

// Get company's received applications
router.get('/company', auth, authorize('industry'), async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user.userId });
    if (!company) return res.status(404).json({ error: 'Company profile not found' });
    const applications = await Application.find({ companyId: company._id })
      .populate('studentId', 'userId')
      .populate('opportunityId', 'title')
      .sort({ applicationDate: -1 });

    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications: ' + err.message });
  }
});

// Update application status
router.patch('/:id/status', auth, authorize('industry'), async (req, res) => {
  try {
    const { status } = req.body;
    if (!applicationStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid application status' });
    }
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const company = await Company.findOne({ userId: req.user.userId });
    if (!company || application.companyId.toString() !== company._id.toString()) {
      return res.status(403).json({ error: 'Access denied' });
    }

    application.status = status;
    application.timeline.push({
      status,
      date: Date.now(),
      notes: `Status changed to ${status}`
    });

    await application.save();

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update application: ' + err.message });
  }
});

// Get single application
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('opportunityId')
      .populate('companyId')
      .populate('studentId');

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    if (req.user.role === 'student') {
      const student = await Student.findOne({ userId: req.user.userId });
      if (!student || application.studentId._id.toString() !== student._id.toString()) {
        return res.status(403).json({ error: 'Access denied' });
      }
    } else if (req.user.role === 'industry') {
      const company = await Company.findOne({ userId: req.user.userId });
      if (!company || application.companyId._id.toString() !== company._id.toString()) {
        return res.status(403).json({ error: 'Access denied' });
      }
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch application: ' + err.message });
  }
});

module.exports = router;
