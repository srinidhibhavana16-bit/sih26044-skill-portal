const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['programming', 'data-science', 'web-development', 'mobile-development', 'devops', 'cloud'],
    required: true
  },
  description: String,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  estimatedTime: Number, // in minutes
  questions: [
    {
      questionText: String,
      type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer'],
        default: 'multiple-choice'
      },
      options: [String],
      correctAnswer: String,
      explanation: String,
      skillTested: String
    }
  ],
  passingScore: {
    type: Number,
    default: 60
  },
  skillsAssessed: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AssessmentResultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  timeSpent: Number, // in minutes
  totalQuestions: Number,
  correctAnswers: Number,
  score: Number, // percentage
  passed: Boolean,
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selectedAnswer: String,
      isCorrect: Boolean
    }
  ],
  skillScores: [
    {
      skill: String,
      score: Number,
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner'
      }
    }
  ]
});

module.exports = {
  Assessment: mongoose.model('Assessment', AssessmentSchema),
  AssessmentResult: mongoose.model('AssessmentResult', AssessmentResultSchema)
};
