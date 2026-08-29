const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());
app.use('/api/auth', require('../../routes/auth'));
app.use('/api/students', require('../../routes/students'));

describe('Student profile persistence', () => {
  let token;

  test('persists academic details, selected skills, and target role through current-student endpoints', async () => {
    const careerRole = await require('../../models/CareerRole').create({ title: 'Backend Developer' });
    const registration = await request(app).post('/api/auth/register').send({
      name: 'Profile Workflow Student',
      email: 'profile-workflow@example.com',
      password: 'SecurePass123',
      confirmPassword: 'SecurePass123',
      role: 'student'
    });

    const save = await request(app).put('/api/students/me/profile')
      .set('Authorization', `Bearer ${registration.body.token}`)
      .send({
        degree: 'B.Tech',
        branch: 'CSE',
        currentYear: 2,
        skills: [
          { name: 'Java', selfDeclaredLevel: 'intermediate' },
          { name: 'SQL', selfDeclaredLevel: 'beginner' }
        ],
        targetRoleId: careerRole._id
      });

    expect(save.status).toBe(200);
    const profile = await request(app).get('/api/students/me')
      .set('Authorization', `Bearer ${registration.body.token}`);
    expect(profile.status).toBe(200);
    expect(profile.body.student).toMatchObject({ degree: 'B.Tech', branch: 'CSE', currentYear: 2 });
    expect(profile.body.student.skills.map(skill => skill.name)).toEqual(['Java', 'SQL']);
    expect(profile.body.student.primaryTargetRole.title).toBe('Backend Developer');
  });

  beforeEach(async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Asha Rao',
      email: 'asha@example.com',
      password: 'SecurePass123',
      confirmPassword: 'SecurePass123',
      role: 'student'
    });
    token = response.body.token;
  });

  test('saves basic information and returns it on a later profile request', async () => {
    const save = await request(app).put('/api/students/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Asha Rao', contactEmail: 'contact@example.com', phone: '9876543210', location: 'Bengaluru', bio: 'Aspiring developer', headline: 'CS Student' });

    expect(save.status).toBe(200);
    const profile = await request(app).get('/api/students/profile').set('Authorization', `Bearer ${token}`);
    expect(profile.status).toBe(200);
    expect(profile.body.user).toMatchObject({ name: 'Asha Rao', location: 'Bengaluru', bio: 'Aspiring developer' });
    expect(profile.body.student.contactEmail).toBe('contact@example.com');
    expect(profile.body.student.headline).toBe('CS Student');
  });

  test('persists education added through the profile API', async () => {
    const save = await request(app).post('/api/students/education')
      .set('Authorization', `Bearer ${token}`)
      .send({ degree: 'B.Tech', institution: 'Example Institute', cgpa: 8.5 });

    expect(save.status).toBe(201);
    const profile = await request(app).get('/api/students/profile').set('Authorization', `Bearer ${token}`);
    expect(profile.body.student.education).toHaveLength(1);
    expect(profile.body.student.education[0]).toMatchObject({ degree: 'B.Tech', institution: 'Example Institute' });
  });

  test('updates and deletes only the signed-in student’s education record', async () => {
    const created = await request(app).post('/api/students/education')
      .set('Authorization', `Bearer ${token}`)
      .send({ degree: 'B.Sc', institution: 'Example Institute', cgpa: 7.5 });
    const educationId = created.body.student.education[0]._id;

    const updated = await request(app).put(`/api/students/education/${educationId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ degree: 'B.Tech', institution: 'Example Institute', cgpa: 8.5 });
    expect(updated.status).toBe(200);
    expect(updated.body.student.education[0].degree).toBe('B.Tech');

    const deleted = await request(app).delete(`/api/students/education/${educationId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleted.status).toBe(200);
    expect(deleted.body.student.education).toHaveLength(0);
  });

  test('rejects invalid education and unauthenticated writes', async () => {
    const invalid = await request(app).post('/api/students/education')
      .set('Authorization', `Bearer ${token}`)
      .send({ degree: '', institution: 'Example Institute', cgpa: 15 });
    expect(invalid.status).toBe(400);

    const unauthenticated = await request(app).post('/api/students/education')
      .send({ degree: 'B.Tech', institution: 'Example Institute' });
    expect(unauthenticated.status).toBe(401);
  });
});
