const express = require('express');
const router = express.Router();
const { Assessment, AssessmentResult } = require('../models/Assessment');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

// Get all assessments
router.get('/', async (req, res) => {
  try {
    const assessments = await Assessment.find().select('-questions');
    res.json({ success: true, assessments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assessments: ' + err.message });
  }
});

// Get specific assessment
router.get('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.json({ success: true, assessment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assessment: ' + err.message });
  }
});

// Submit assessment
router.post('/:id/submit', auth, authorize('student'), async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    // Calculate score
    let correctAnswers = 0;
    let skillScores = {};

    assessment.skillsAssessed.forEach(skill => {
      skillScores[skill] = { score: 0, count: 0 };
    });

    answers.forEach((answer, index) => {
      const question = assessment.questions[index];
      if (question && answer === question.correctAnswer) {
        correctAnswers++;
        const skill = question.skillTested;
        if (skillScores[skill]) {
          skillScores[skill].score += 1;
          skillScores[skill].count += 1;
        }
      }
    });

    const score = Math.round((correctAnswers / assessment.questions.length) * 100);
    const passed = score >= assessment.passingScore;

    // Calculate skill levels
    const skillScoresArray = Object.entries(skillScores).map(([skill, data]) => {
      const percent = Math.round((data.score / data.count) * 100);
      let level = 'beginner';
      if (percent >= 75) level = 'advanced';
      else if (percent >= 50) level = 'intermediate';
      return { skill, score: percent, level };
    });

    // Create result
    const result = new AssessmentResult({
      studentId: req.user.userId,
      assessmentId: assessment._id,
      completedAt: Date.now(),
      timeSpent,
      totalQuestions: assessment.questions.length,
      correctAnswers,
      score,
      passed,
      answers,
      skillScores: skillScoresArray
    });

    await result.save();

    // Update student profile with assessment results
    const student = await Student.findOneAndUpdate(
      { userId: req.user.userId },
      { $push: { assessmentResults: result._id } },
      { new: true }
    );

    // Update skills based on assessment
    skillScoresArray.forEach(skillData => {
      const existingSkill = student.skills.find(s => s.name === skillData.skill);
      if (existingSkill) {
        existingSkill.level = skillData.level;
        existingSkill.evidence.push({
          type: 'assessment',
          title: assessment.title,
          score: skillData.score,
          date: Date.now()
        });
      } else {
        student.skills.push({
          name: skillData.skill,
          level: skillData.level,
          evidence: [{
            type: 'assessment',
            title: assessment.title,
            score: skillData.score,
            date: Date.now()
          }]
        });
      }
    });

    await student.save();

    res.status(201).json({
      success: true,
      result: {
        score,
        passed,
        correctAnswers,
        totalQuestions: assessment.questions.length,
        skillScores: skillScoresArray
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit assessment: ' + err.message });
  }
});

// Get student assessment results
router.get('/results/:studentId', auth, async (req, res) => {
  try {
    const results = await AssessmentResult.find({ studentId: req.params.studentId })
      .populate('assessmentId', 'title category');
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results: ' + err.message });
  }
});

module.exports = router;
