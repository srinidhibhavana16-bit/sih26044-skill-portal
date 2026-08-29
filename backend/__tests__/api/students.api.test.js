/**
 * API Tests for Student Profile
 * Tests student profile CRUD operations
 */

const request = require('supertest');
const express = require('express');
const User = require('../../models/User');
const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/students', require('../../routes/students'));

describe('Student Profile API', () => {
  let studentToken;
  let studentId;
  let userId;

  beforeEach(async () => {
    // Create a test student user
    const user = new User({
      name: 'Test Student',
      email: 'student@profile.com',
      password: 'SecurePass123',
      role: 'student'
    });
    await user.save();

    userId = user._id;

    // Create student profile
    const student = new Student({ userId: user._id });
    await student.save();
    studentId = student._id;

    // Generate JWT token
    studentToken = jwt.sign(
      { userId: user._id, email: user.email, role: 'student' },
      process.env.JWT_SECRET || 'isotopes_sih26044_jwt_secret_key_change_in_production',
      { expiresIn: '7d' }
    );
  });

  describe('GET /api/students/profile', () => {

    test('should get student profile when authenticated', async () => {
      const response = await request(app)
        .get('/api/students/profile')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(response.status).toBe(200);
      expect(response.body.profile).toBeDefined();
      expect(response.body.profile.userId.toString()).toBe(userId.toString());
    });

    test('should reject request without authentication', async () => {
      const response = await request(app)
        .get('/api/students/profile');

      expect(response.status).toBe(401);
    });

    test('should return student profile with all fields', async () => {
      const response = await request(app)
        .get('/api/students/profile')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(response.status).toBe(200);
      const profile = response.body.profile;
      expect(profile.education).toEqual([]);
      expect(profile.experience).toEqual([]);
      expect(profile.projects).toEqual([]);
      expect(profile.skills).toEqual([]);
    });

  });

  describe('POST /api/students/education', () => {

    test('should add education to student profile', async () => {
      const response = await request(app)
        .post('/api/students/education')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          degree: 'B.Tech',
          school: 'MIT',
          field: 'Computer Science',
          startDate: '2020-01-15',
          endDate: '2024-05-30',
          cgpa: 3.8
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);

      // Verify education saved
      const student = await Student.findById(studentId);
      expect(student.education.length).toBe(1);
      expect(student.education[0].degree).toBe('B.Tech');
      expect(student.education[0].cgpa).toBe(3.8);
    });

    test('should add multiple education entries', async () => {
      await request(app)
        .post('/api/students/education')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          degree: 'B.Tech',
          school: 'MIT',
          field: 'Computer Science',
          startDate: '2020-01-15',
          endDate: '2024-05-30'
        });

      await request(app)
        .post('/api/students/education')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          degree: 'M.Tech',
          school: 'Stanford',
          field: 'AI & ML',
          startDate: '2024-06-15',
          endDate: '2026-05-30'
        });

      const student = await Student.findById(studentId);
      expect(student.education.length).toBe(2);
    });

  });

  describe('POST /api/students/skills', () => {

    test('should add skill to student profile', async () => {
      const response = await request(app)
        .post('/api/students/skills')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          name: 'Python',
          level: 'intermediate'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);

      const student = await Student.findById(studentId);
      expect(student.skills.length).toBe(1);
      expect(student.skills[0].name).toBe('Python');
      expect(student.skills[0].level).toBe('intermediate');
    });

    test('should add multiple distinct skills', async () => {
      await request(app)
        .post('/api/students/skills')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ name: 'Python', level: 'intermediate' });

      await request(app)
        .post('/api/students/skills')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ name: 'JavaScript', level: 'beginner' });

      const student = await Student.findById(studentId);
      expect(student.skills.length).toBe(2);
      expect(student.skills.map(s => s.name)).toContain('Python');
      expect(student.skills.map(s => s.name)).toContain('JavaScript');
    });

    test('should not add duplicate skills', async () => {
      await request(app)
        .post('/api/students/skills')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ name: 'Python', level: 'intermediate' });

      const response = await request(app)
        .post('/api/students/skills')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ name: 'Python', level: 'advanced' });

      expect(response.status).toBe(400);

      const student = await Student.findById(studentId);
      expect(student.skills.length).toBe(1);
    });

  });

  describe('PUT /api/students/profile', () => {

    test('should update student profile', async () => {
      const response = await request(app)
        .put('/api/students/profile')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          targetRole: 'Software Engineer',
          bio: 'Aspiring full-stack developer'
        });

      expect(response.status).toBe(200);

      const student = await Student.findById(studentId);
      expect(student.targetRole).toBe('Software Engineer');
    });

  });

  describe('DELETE /api/students/skills/:id', () => {

    test('should delete skill from profile', async () => {
      // First add a skill
      await request(app)
        .post('/api/students/skills')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ name: 'Python', level: 'intermediate' });

      const student = await Student.findById(studentId);
      const skillId = student.skills[0]._id;

      // Delete the skill
      const response = await request(app)
        .delete(`/api/students/skills/${skillId}`)
        .set('Authorization', `Bearer ${studentToken}`);

      expect(response.status).toBe(200);

      // Verify deleted
      const updatedStudent = await Student.findById(studentId);
      expect(updatedStudent.skills.length).toBe(0);
    });

  });

  describe('Profile Completion Tracking', () => {

    test('should calculate profile completion percentage', async () => {
      // Add some profile data
      await request(app)
        .post('/api/students/education')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          degree: 'B.Tech',
          school: 'MIT',
          field: 'CS',
          startDate: '2020-01-15',
          endDate: '2024-05-30'
        });

      await request(app)
        .post('/api/students/skills')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ name: 'Python', level: 'intermediate' });

      const student = await Student.findById(studentId);
      expect(student.profileCompletion).toBeGreaterThan(0);
    });

  });

});
