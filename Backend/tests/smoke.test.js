const request = require('supertest');
const app = require('../index'); 



describe('Smoke Tests', () => { 
  it('should return a 200 OK for the register endpoint', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'hesham',
      lastName: 'darwish',
      phoneNumber: '1650486010',
      email: 'hesham@example.com',
      password: 'password123',
    
    });
    expect(response.statusCode).toBe(201);
  });

  it('should return a 200 OK for the login endpoint', async () => {
    const response = await request(app).post('/login').send({
      email: 'jana@example.com',
      password: 'password123'
    });
    expect(response.statusCode).toBe(200);
  });
});
