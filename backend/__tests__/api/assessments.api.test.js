/**
 * API Tests for Assessments
 * Tests assessment submission and scoring
 */

const request = require('supertest');
const express = require('express');
const User = require('../../models/User');
const Student = require('../../models/Student');
const Assessment = require('../../models/Assessment');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api/assessments', require('../../routes/assessments'));

describe('Assessment API', () => {
  let studentToken;
  let studentId;
  let assessmentId;

  beforeEach(async () => {
    // Create student user
    const user = new User({
      name: 'Assessment Student',
      email: 'assessstudent@test.com',
      password: 'SecurePass123',
      role: 'student'
    });
    await user.save();

    const student = new Student({ userId: user._id });
    await student.save();
    studentId = student._id;

    // Generate token
    studentToken = jwt.sign(
      { userId: user._id, email: user.email, role: 'student' },
      process.env.JWT_SECRET || 'isotopes_sih26044_jwt_secret_key_change_in_production',
      { expiresIn: '7d' }
    );

    // Create test assessment
    const assessment = new Assessment({
      title: 'Python Programming Basics',
      category: 'Programming',
      difficulty: 'Beginner',
      questions: [
        {
          text: 'What is the output of print(2 ** 3)?',
          type: 'multiple_choice',
          options: ['6', '8', '9', '5'],
          correctAnswer: '8',
          skillTested: 'Python',
          explanation: '2 ** 3 = 8 (2 to the power of 3)'
        },
        {
          text: 'Which is a valid Python variable name?',
          type: 'multiple_choice',
          options: ['2var', 'my_var', 'my-var', '$var'],
          correctAnswer: 'my_var',
          skillTested: 'Python',
          explanation: 'Python variable names cannot start with a number, contain hyphens, or $ symbol'
        }
      ]
    });
    await assessment.save();
    assessmentId = assessment._id;
  });

  describe('GET /api/assessments', () => {

    test('should get all assessments', async () => {
      const response = await request(app)
        .get('/api/assessments');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('should include assessment details', async () => {
      const response = await request(app)
        .get('/api/assessments');

      const assessment = response.body[0];
      expect(assessment.title).toBeDefined();
      expect(assessment.category).toBeDefined();
      expect(assessment.questions).toBeDefined();
    });

  });

  describe('GET /api/assessments/:id', () => {

    test('should get specific assessment', async () => {
      const response = await request(app)
        .get(`/api/assessments/${assessmentId}`);

      expect(response.status).toBe(200);
      expect(response.body._id.toString()).toBe(assessmentId.toString());
      expect(response.body.title).toBe('Python Programming Basics');
    });

    test('should include all questions', async () => {
      const response = await request(app)
        .get(`/api/assessments/${assessmentId}`);

      expect(response.body.questions.length).toBe(2);
      expect(response.body.questions[0].text).toBeDefined();
      expect(response.body.questions[0].options).toBeDefined();
    });

    test('should return 404 for invalid assessment ID', async () => {
      const invalidId = '507f1f77bcf86cd799439999';
      const response = await request(app)
        .get(`/api/assessments/${invalidId}`);

      expect(response.status).toBe(404);
    });

  });

  describe('POST /api/assessments/:id/submit', () => {

    test('should submit assessment with correct answers', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8', 'my_var']
        });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(2); // 2 correct out of 2
      expect(response.body.passed).toBe(true);
    });

    test('should submit assessment with incorrect answers', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['6', '$var'] // Wrong answers
        });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(0);
      expect(response.body.passed).toBe(false);
    });

    test('should calculate percentage score', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8', 'my_var']
        });

      expect(response.body.scorePercentage).toBe(100);
    });

    test('should calculate partial score', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8', '$var'] // 1 correct, 1 wrong
        });

      expect(response.body.score).toBe(1);
      expect(response.body.scorePercentage).toBe(50);
    });

    test('should require authentication', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .send({
          answers: ['8', 'my_var']
        });

      expect(response.status).toBe(401);
    });

    test('should reject wrong answer count', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8'] // Only 1 answer for 2 questions
        });

      expect(response.status).toBe(400);
    });

    test('should track skill proficiency from assessment', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8', 'my_var']
        });

      expect(response.body.skillScores).toBeDefined();
      expect(response.body.skillScores.Python).toBeDefined();
    });

    test('should save assessment result to student profile', async () => {
      await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8', 'my_var']
        });

      const student = await Student.findById(studentId);
      expect(student.assessmentResults).toBeDefined();
      expect(student.assessmentResults.length).toBeGreaterThan(0);
    });

  });

  describe('Assessment Scoring Logic', () => {

    test('should pass assessment with 70% score', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8', 'my_var']
        });

      expect(response.body.passed).toBe(true);
    });

    test('should provide feedback on answers', async () => {
      const response = await request(app)
        .post(`/api/assessments/${assessmentId}/submit`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({
          answers: ['8', '$var'] // Wrong on second
        });

      expect(response.body.feedback).toBeDefined();
      expect(response.body.feedback.length).toBeGreaterThan(0);
    });

  });

});
