import request from 'supertest';
import app from '../src/app';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        username: 'johntest',
        email: 'johntest@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'johntest@example.com',
        password: 'Password123!',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.user.email).toBe('johntest@example.com');
  });
});
