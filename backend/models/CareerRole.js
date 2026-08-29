const mongoose = require('mongoose');

const CareerRoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  industry: String,
  experience_level: {
    type: String,
    enum: ['entry', 'mid', 'senior'],
    default: 'entry'
  },
  requiredSkills: [
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
        default: 'high'
      },
      alternatives: [String] // Skills that can substitute
    }
  ],
  niceToHaveSkills: [
    {
      name: String,
      level: String
    }
  ],
  averageSalary: Number,
  jobMarketDemand: {
    type: String,
    enum: ['very_high', 'high', 'medium', 'low'],
    default: 'high'
  },
  futureRelevance: {
    type: String,
    enum: ['emerging', 'stable', 'declining'],
    default: 'stable'
  },
  typicalCompanies: [String],
  careerPathDetails: {
    description: String,
    nextRoles: [String],
    growthOpportunities: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CareerRole', CareerRoleSchema);
