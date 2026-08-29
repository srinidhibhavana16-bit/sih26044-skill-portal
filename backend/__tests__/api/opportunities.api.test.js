/**
 * API Tests for Opportunities
 * Tests opportunity CRUD and browsing
 */

const request = require('supertest');
const express = require('express');
const User = require('../../models/User');
const Company = require('../../models/Company');
const Opportunity = require('../../models/Opportunity');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/opportunities', require('../../routes/opportunities'));

describe('Opportunity API', () => {
  let industryToken;
  let companyId;
  let opportunityId;

  beforeEach(async () => {
    // Create industry user
    const user = new User({
      name: 'Test Company',
      email: 'company@opp.com',
      password: 'SecurePass123',
      role: 'industry'
    });
    await user.save();

    const company = new Company({
      userId: user._id,
      companyName: 'Tech Corp',
      industry: 'Information Technology'
    });
    await company.save();
    companyId = company._id;

    // Generate token
    industryToken = jwt.sign(
      { userId: user._id, email: user.email, role: 'industry' },
      process.env.JWT_SECRET || 'isotopes_sih26044_jwt_secret_key_change_in_production',
      { expiresIn: '7d' }
    );

    // Create test opportunity
    const opportunity = new Opportunity({
      title: 'Frontend Developer Internship',
      type: 'internship',
      company: company._id,
      description: 'Join our team to build amazing web applications',
      requiredSkills: [
        { name: 'JavaScript', level: 'intermediate', importance: 'critical' },
        { name: 'React', level: 'beginner', importance: 'critical' },
        { name: 'CSS', level: 'beginner', importance: 'important' }
      ],
      location: 'Bangalore',
      locationType: 'hybrid',
      salary: { min: 300000, max: 500000 },
      duration: '3 months',
      isOpen: true
    });
    await opportunity.save();
    opportunityId = opportunity._id;
  });

  describe('GET /api/opportunities', () => {

    test('should get all opportunities', async () => {
      const response = await request(app)
        .get('/api/opportunities');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('should include opportunity details', async () => {
      const response = await request(app)
        .get('/api/opportunities');

      const opp = response.body[0];
      expect(opp.title).toBeDefined();
      expect(opp.type).toBeDefined();
      expect(opp.company).toBeDefined();
    });

    test('should filter opportunities by type', async () => {
      const response = await request(app)
        .get('/api/opportunities?type=internship');

      expect(response.status).toBe(200);
      response.body.forEach(opp => {
        expect(opp.type).toBe('internship');
      });
    });

    test('should filter opportunities by location type', async () => {
      const response = await request(app)
        .get('/api/opportunities?locationType=hybrid');

      expect(response.status).toBe(200);
      response.body.forEach(opp => {
        expect(opp.locationType).toBe('hybrid');
      });
    });

    test('should apply multiple filters', async () => {
      const response = await request(app)
        .get('/api/opportunities?type=internship&locationType=hybrid');

      expect(response.status).toBe(200);
      response.body.forEach(opp => {
        expect(opp.type).toBe('internship');
        expect(opp.locationType).toBe('hybrid');
      });
    });

  });

  describe('GET /api/opportunities/:id', () => {

    test('should get specific opportunity', async () => {
      const response = await request(app)
        .get(`/api/opportunities/${opportunityId}`);

      expect(response.status).toBe(200);
      expect(response.body._id.toString()).toBe(opportunityId.toString());
      expect(response.body.title).toBe('Frontend Developer Internship');
    });

    test('should include required skills', async () => {
      const response = await request(app)
        .get(`/api/opportunities/${opportunityId}`);

      expect(response.body.requiredSkills).toBeDefined();
      expect(response.body.requiredSkills.length).toBe(3);
      expect(response.body.requiredSkills[0].name).toBe('JavaScript');
    });

    test('should include salary information', async () => {
      const response = await request(app)
        .get(`/api/opportunities/${opportunityId}`);

      expect(response.body.salary).toBeDefined();
      expect(response.body.salary.min).toBe(300000);
      expect(response.body.salary.max).toBe(500000);
    });

  });

  describe('POST /api/opportunities', () => {

    test('should create opportunity as industry user', async () => {
      const response = await request(app)
        .post('/api/opportunities')
        .set('Authorization', `Bearer ${industryToken}`)
        .send({
          title: 'Backend Developer Job',
          type: 'job',
          description: 'Senior backend developer position',
          requiredSkills: [
            { name: 'Python', importance: 'critical' },
            { name: 'Django', importance: 'critical' }
          ],
          location: 'New York',
          locationType: 'remote',
          salary: { min: 1000000, max: 1500000 },
          duration: 'Full-time'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.opportunity.title).toBe('Backend Developer Job');
      expect(response.body.opportunity.company.toString()).toBe(companyId.toString());
    });

    test('should require authentication to create opportunity', async () => {
      const response = await request(app)
        .post('/api/opportunities')
        .send({
          title: 'Backend Developer Job',
          type: 'job',
          description: 'Senior backend developer position'
        });

      expect(response.status).toBe(401);
    });

    test('should only allow industry users to create opportunities', async () => {
      // Create student user
      const studentUser = new User({
        name: 'Test Student',
        email: 'student@opp.com',
        password: 'SecurePass123',
        role: 'student'
      });
      await studentUser.save();

      const studentToken = jwt.sign(
        { userId: studentUser._id, email: studentUser.email, role: 'student' },
        process.env.JWT_SECRET || 'isotopes_sih26044_jwt_secret_key_change_in_production',
        { expiresIn: '7d' }
      );

      const response = await request(app)
        .post('/api/opportunities')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          title: 'Backend Developer Job',
          type: 'job'
        });

      expect(response.status).toBe(403);
    });

  });

  describe('PATCH /api/opportunities/:id/close', () => {

    test('should close opportunity', async () => {
      const response = await request(app)
        .patch(`/api/opportunities/${opportunityId}/close`)
        .set('Authorization', `Bearer ${industryToken}`);

      expect(response.status).toBe(200);

      const opportunity = await Opportunity.findById(opportunityId);
      expect(opportunity.isOpen).toBe(false);
    });

    test('should only allow company that posted to close', async () => {
      // Create another company
      const otherUser = new User({
        name: 'Other Company',
        email: 'other@opp.com',
        password: 'SecurePass123',
        role: 'industry'
      });
      await otherUser.save();

      const otherToken = jwt.sign(
        { userId: otherUser._id, email: otherUser.email, role: 'industry' },
        process.env.JWT_SECRET || 'isotopes_sih26044_jwt_secret_key_change_in_production',
        { expiresIn: '7d' }
      );

      const response = await request(app)
        .patch(`/api/opportunities/${opportunityId}/close`)
        .set('Authorization', `Bearer ${otherToken}`);

      expect(response.status).toBe(403);
    });

  });

  describe('Opportunity Status', () => {

    test('should only show open opportunities by default', async () => {
      // Close the opportunity
      await request(app)
        .patch(`/api/opportunities/${opportunityId}/close`)
        .set('Authorization', `Bearer ${industryToken}`);

      // Create new open opportunity
      const newOpp = new Opportunity({
        title: 'Data Scientist Position',
        type: 'job',
        company: companyId,
        description: 'Join our AI team',
        location: 'San Francisco',
        isOpen: true
      });
      await newOpp.save();

      const response = await request(app)
        .get('/api/opportunities');

      // Should not show closed opportunity
      const titles = response.body.map(o => o.title);
      expect(titles).toContain('Data Scientist Position');
      expect(titles).not.toContain('Frontend Developer Internship');
    });

  });

});
