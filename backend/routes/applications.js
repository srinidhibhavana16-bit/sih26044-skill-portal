const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Opportunity = require('../models/Opportunity');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

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

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      studentId: req.user.userId,
      opportunityId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this opportunity' });
    }

    // Get student skills
    const student = await Student.findOne({ userId: req.user.userId });
    const skillMatch = calculateSkillMatch(student.skills, opportunity.skills);

    // Create application
    const application = new Application({
      studentId: req.user.userId,
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
    const applications = await Application.find({ studentId: req.user.userId })
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
    const applications = await Application.find({ companyId: req.user.userId })
      .populate('studentId', 'userId')
      .populate('opportunityId', 'title')
      .sort({ applicationDate: -1 });

    res.json({ success: true, applications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications: ' + err.message });
  }
});

// Update application status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Verify company ownership
    if (req.user.role === 'industry') {
      // Verify this user's company owns this application
      // For now, allow any industry user
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

    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch application: ' + err.message });
  }
});

module.exports = router;
