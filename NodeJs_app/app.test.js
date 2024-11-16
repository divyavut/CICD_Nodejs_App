const request = require('supertest');
const express = require('express');

// Your Express app code
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, CI/CD with EKS!');
});

describe('GET /', () => {
  it('should return "Hello, CI/CD with EKS!"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, CI/CD with EKS!');
  });
});