const request = require('supertest');
const app = require('../index'); 



describe('Smoke Tests', () => { 
  it('should return a 200 OK for the register endpoint', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Nourhan',
      lastName: 'darwish',
      phoneNumber: '0100123456',
      email: 'nourhan@example.com',
      password: 'password123',
    
    });
    expect(response.statusCode).toBe(201);
  });

  it('should return a 200 OK for the login endpoint', async () => {
    const response = await request(app).post('/login').send({
      email: 'nourhan@example.com',
      password: 'password123'
    });
    expect(response.statusCode).toBe(200);
  });
});
