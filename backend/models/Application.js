const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'accepted', 'offer_received', 'offer_accepted'],
    default: 'applied'
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  coverLetter: String,
  skillMatch: {
    matchPercentage: Number,
    matchedSkills: [String],
    missingSkills: [String],
    matchExplanation: String
  },
  timeline: [
    {
      status: String,
      date: Date,
      notes: String
    }
  ],
  interviewDetails: {
    stage: Number,
    date: Date,
    type: String,
    interviewer: String,
    feedback: String
  },
  offerDetails: {
    position: String,
    salary: Number,
    currency: String,
    startDate: Date,
    offerDate: Date,
    expiryDate: Date,
    terms: String
  },
  studentNotes: String,
  companyNotes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ApplicationSchema.index({ studentId: 1, opportunityId: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
