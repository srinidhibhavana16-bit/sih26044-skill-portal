const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  type: {
    type: String,
    enum: ['internship', 'job', 'fellowship'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  skills: [
    {
      name: String,
      level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'intermediate'
      },
      importance: {
        type: String,
        enum: ['critical', 'high', 'medium', 'low'],
        default: 'medium'
      }
    }
  ],
  location: String,
  locationType: {
    type: String,
    enum: ['onsite', 'remote', 'hybrid'],
    default: 'hybrid'
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  duration: String, // e.g., "3-6 months" for internship
  startDate: Date,
  endDate: Date,
  applicationDeadline: Date,
  experienceRequired: String,
  education: {
    minDegree: String,
    preferredDegree: [String]
  },
  aboutRole: String,
  responsibilities: [String],
  benefits: [String],
  applicationCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'filled'],
    default: 'open'
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

module.exports = mongoose.model('Opportunity', OpportunitySchema);
