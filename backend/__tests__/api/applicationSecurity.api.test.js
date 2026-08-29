const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Student = require('../../models/Student');
const Company = require('../../models/Company');
const Opportunity = require('../../models/Opportunity');
const Application = require('../../models/Application');

const app = express();
app.use(express.json());
app.use('/api/applications', require('../../routes/applications'));

const tokenFor = (user) => jwt.sign(
  { userId: user._id, email: user.email, role: user.role },
  process.env.JWT_SECRET || 'isotopes_sih26044_jwt_secret_key_change_in_production'
);

describe('Application ownership and matching', () => {
  let student;
  let studentToken;
  let company;
  let industryToken;
  let otherIndustryToken;
  let opportunity;

  beforeEach(async () => {
    const studentUser = await User.create({ name: 'Student', email: 'student@example.com', password: 'SecurePass123', role: 'student' });
    student = await Student.create({ userId: studentUser._id, skills: [{ name: 'JavaScript', level: 'intermediate' }] });
    studentToken = tokenFor(studentUser);

    const companyUser = await User.create({ name: 'Owner', email: 'owner@example.com', password: 'SecurePass123', role: 'industry' });
    company = await Company.create({ userId: companyUser._id, companyName: 'Owner Co' });
    industryToken = tokenFor(companyUser);

    const otherUser = await User.create({ name: 'Other', email: 'other@example.com', password: 'SecurePass123', role: 'industry' });
    await Company.create({ userId: otherUser._id, companyName: 'Other Co' });
    otherIndustryToken = tokenFor(otherUser);

    opportunity = await Opportunity.create({
      companyId: company._id,
      type: 'internship',
      title: 'Frontend intern',
      skills: [{ name: 'JavaScript' }, { name: 'React' }]
    });
  });

  test('creates an evidence-preserving application with explainable match data', async () => {
    const response = await request(app).post('/api/applications')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ opportunityId: opportunity._id.toString() });

    expect(response.status).toBe(201);
    expect(response.body.application.studentId).toBe(student._id.toString());
    expect(response.body.application.skillMatch).toMatchObject({
      matchPercentage: 50,
      matchedSkills: ['JavaScript'],
      missingSkills: ['React']
    });
  });

  test('shows applications only to the company that owns the opportunity', async () => {
    await request(app).post('/api/applications').set('Authorization', `Bearer ${studentToken}`).send({ opportunityId: opportunity._id.toString() });

    const response = await request(app).get('/api/applications/company').set('Authorization', `Bearer ${industryToken}`);
    expect(response.status).toBe(200);
    expect(response.body.applications).toHaveLength(1);
  });

  test('blocks students and other companies from changing an application status', async () => {
    const created = await request(app).post('/api/applications').set('Authorization', `Bearer ${studentToken}`).send({ opportunityId: opportunity._id.toString() });
    const applicationId = created.body.application._id;

    const studentAttempt = await request(app).patch(`/api/applications/${applicationId}/status`).set('Authorization', `Bearer ${studentToken}`).send({ status: 'shortlisted' });
    const otherCompanyAttempt = await request(app).patch(`/api/applications/${applicationId}/status`).set('Authorization', `Bearer ${otherIndustryToken}`).send({ status: 'shortlisted' });

    expect(studentAttempt.status).toBe(403);
    expect(otherCompanyAttempt.status).toBe(403);
  });

  test('allows the owning company to update to a valid status and records its timeline', async () => {
    const created = await request(app).post('/api/applications').set('Authorization', `Bearer ${studentToken}`).send({ opportunityId: opportunity._id.toString() });
    const response = await request(app).patch(`/api/applications/${created.body.application._id}/status`)
      .set('Authorization', `Bearer ${industryToken}`).send({ status: 'shortlisted' });

    expect(response.status).toBe(200);
    const application = await Application.findById(created.body.application._id);
    expect(application.status).toBe('shortlisted');
    expect(application.timeline).toHaveLength(1);
  });
});
