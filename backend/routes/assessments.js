const express = require('express');
const router = express.Router();
const { Assessment, AssessmentResult } = require('../models/Assessment');
const Student = require('../models/Student');
const { auth, authorize } = require('../middleware/auth');

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function questionFingerprint(question) {
  return String(question.questionText || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function publicAssessment(assessment) {
  const value = assessment.toObject ? assessment.toObject() : assessment;
  return {
    ...value,
    questions: value.questions.map(question => ({
      _id: question._id,
      questionText: question.questionText,
      type: question.type,
      options: question.options,
      skillTested: question.skillTested
    }))
  };
}

// Get all assessments
router.get('/', async (req, res) => {
  try {
    const assessments = await Assessment.find().select('-questions');
    res.json({ success: true, assessments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assessments: ' + err.message });
  }
});

router.post('/generate', auth, authorize('student'), async (req, res) => {
  try {
    const requestedSkills = Array.isArray(req.body.skills) ? req.body.skills : [];
    const student = await Student.findOne({ userId: req.user.userId });
    if (!student) return res.status(404).json({ error: 'Student profile not found' });

    const profileSkills = student.skills.map(skill => skill.name);
    const profileSkillLookup = new Map(profileSkills.map(skill => [skill.toLowerCase(), skill]));
    const skills = [...new Set(requestedSkills.map(skill => String(skill).trim().toLowerCase()).map(skill => profileSkillLookup.get(skill)).filter(Boolean))];
    if (!skills.length) return res.status(400).json({ error: 'Select at least one skill from your profile' });

    const sourceAssessments = await Assessment.find({ 'questions.skillTested': { $in: skills } });
    const questions = sourceAssessments.flatMap(source => source.questions.filter(question => skills.some(skill => skill.toLowerCase() === question.skillTested?.toLowerCase())));
    if (questions.length < 1) return res.status(400).json({ error: 'Not enough questions are currently available for the selected skills.' });
    const previousAssessments = await Assessment.find({ title: /^Profile skills assessment:/, skillsAssessed: { $all: skills } }).select('questions');
    const previouslyUsed = new Set(previousAssessments.flatMap(item => item.questions).map(questionFingerprint));
    const unseenQuestions = questions.filter(question => !previouslyUsed.has(questionFingerprint(question)));
    const selectedQuestions = shuffle(unseenQuestions.length ? unseenQuestions : questions).slice(0, Math.min(questions.length, 10));
    const assessment = await Assessment.create({
      title: `Profile skills assessment: ${skills.join(', ')}`,
      category: 'programming',
      description: 'Curated Question Bank assessment based on your selected profile skills.',
      questions: selectedQuestions,
      skillsAssessed: skills
    });

    res.status(201).json({ success: true, assessment: publicAssessment(assessment), source: 'Curated Question Bank' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create assessment: ' + err.message });
  }
});

// Get student assessment results
router.get('/results/me', auth, authorize('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.userId });
    if (!student) return res.status(404).json({ error: 'Student profile not found' });
    const results = await AssessmentResult.find({ studentId: student._id })
      .populate('assessmentId', 'title category')
      .sort({ completedAt: -1 });
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results: ' + err.message });
  }
});

router.get('/results/:studentId', auth, async (req, res) => {
  try {
    if (req.user.role === 'student') {
      const student = await Student.findOne({ userId: req.user.userId });
      if (!student || student._id.toString() !== req.params.studentId) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }
    const results = await AssessmentResult.find({ studentId: req.params.studentId })
      .populate('assessmentId', 'title category');
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results: ' + err.message });
  }
});

// Get specific assessment
router.get('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.json({ success: true, assessment: publicAssessment(assessment) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assessment: ' + err.message });
  }
});

// Submit assessment
router.post('/:id/submit', auth, authorize('student'), async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'Answers must be an array' });
    }
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    if (answers.length !== assessment.questions.length) {
      return res.status(400).json({ error: 'Please submit an answer for every question' });
    }

    // Calculate score
    let correctAnswers = 0;
    let skillScores = {};

    assessment.skillsAssessed.forEach(skill => {
      skillScores[skill] = { score: 0, count: 0 };
    });

    const answerRecords = answers.map((answer, index) => {
      const question = assessment.questions[index];
      if (!question) return null;
      const skill = question.skillTested;
      if (skillScores[skill]) skillScores[skill].count += 1;
      const answerIndex = Number(answer);
      const selectedAnswer = Number.isInteger(answerIndex) && answerIndex >= 0 && answerIndex < question.options.length
        ? question.options[answerIndex]
        : answer;
      const isCorrect = selectedAnswer === question.correctAnswer;
      if (isCorrect) {
        correctAnswers++;
        if (skillScores[skill]) {
          skillScores[skill].score += 1;
        }
      }
      return { questionId: question._id, selectedAnswer, isCorrect };
    });

    const score = Math.round((correctAnswers / assessment.questions.length) * 100);
    const passed = score >= assessment.passingScore;

    // Calculate skill levels
    const skillScoresArray = Object.entries(skillScores).map(([skill, data]) => {
      const percent = data.count === 0 ? 0 : Math.round((data.score / data.count) * 100);
      let level = 'beginner';
      if (percent >= 75) level = 'advanced';
      else if (percent >= 50) level = 'intermediate';
      return { skill, score: percent, level };
    });

    const student = await Student.findOne({ userId: req.user.userId });
    if (!student) {
      return res.status(404).json({ error: 'Student profile not found' });
    }

    // Create result
    const result = new AssessmentResult({
      studentId: student._id,
      assessmentId: assessment._id,
      completedAt: Date.now(),
      timeSpent,
      totalQuestions: assessment.questions.length,
      correctAnswers,
      score,
      passed,
      answers: answerRecords.filter(Boolean),
      skillScores: skillScoresArray
    });

    await result.save();

    // Update student profile with assessment results
    student.assessmentResults.push(result._id);

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

module.exports = router;
