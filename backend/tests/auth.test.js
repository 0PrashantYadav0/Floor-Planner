const request = require('supertest');
const app = require('../index');
const User = require('../Models/userModel');

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        useremail: 'test@example.com',
        password: 'password123'
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(res.body).toHaveProperty('token');
      expect(res.body.useremail).toBe(userData.useremail);
    });

    it('should not register duplicate email', async () => {
      const userData = {
        username: 'testuser',
        useremail: 'test@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);

      const res = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(res.body.message).toContain('already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const userData = {
        username: 'testuser',
        useremail: 'test@example.com',
        password: 'password123'
      };
      await request(app)
        .post('/api/auth/register')
        .send(userData);
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          useremail: 'test@example.com',
          password: 'password123'
        })
        .expect(200);

      expect(res.body).toHaveProperty('token');
      expect(res.body.useremail).toBe('test@example.com');
    });

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          useremail: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(res.body.message).toContain('Invalid');
    });
  });
});

