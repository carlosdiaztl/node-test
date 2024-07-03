const request = require('supertest');
const app = require('../app');
const knex = require('../connection'); // Asegúrate de que esta ruta sea correcta

describe('User API', () => {
  let server;
  
  beforeAll(() => {
    server = app.listen(4000);
  });

  afterAll(async () => {
    await knex.destroy();
    server.close();
  });

  it('should update a user name', async () => {
    const response = await request(server)
      .post('/')
      .send({ id: 1, name: 'newName' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('estado', 'ok');
  });

  it('should return 404 if user not found', async () => {
    const response = await request(server)
      .post('/')
      .send({ id: 9999, name: 'newName' });

    expect(response.status).toBe(404);
    expect(response.text).toBe('User not found');
  });

  it('should return 500 if there is an error', async () => {
    // This test assumes that the ID field is not nullable.
    const response = await request(server)
      .post('/')
      .send({ id: null, name: 'newName' });

    expect(response.status).toBe(500);
  });
});
