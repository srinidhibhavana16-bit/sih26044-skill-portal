const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  headline: String,
  education: [
    {
      degree: String,
      institution: String,
      startDate: Date,
      endDate: Date,
      cgpa: Number,
      description: String
    }
  ],
  experience: [
    {
      jobTitle: String,
      company: String,
      duration: String,
      description: String,
      startDate: Date,
      endDate: Date
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      skills: [String],
      link: String,
      startDate: Date,
      endDate: Date
    }
  ],
  certifications: [
    {
      name: String,
      provider: String,
      issueDate: Date,
      expiryDate: Date,
      link: String
    }
  ],
  skills: [
    {
      name: String,
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner'
      },
      endorsements: {
        type: Number,
        default: 0
      },
      evidence: [
        {
          type: {
            type: String,
            enum: ['assessment', 'project', 'certification', 'internship'],
            default: 'assessment'
          },
          title: String,
          score: Number,
          date: Date
        }
      ]
    }
  ],
  targetRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CareerRole'
  },
  assessmentResults: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AssessmentResult'
    }
  ],
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    }
  ],
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema);
