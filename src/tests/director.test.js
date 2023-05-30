const request = require('supertest')
const app = require('../app')
require('../models')

let directorId;

test('POST /directors should create a director', async () => {
    const body = {
        firstName: "anderson",
        lastName: "puppi",
        nationality: "Peru",
        image: "director.img",
        birthday: "2002-04-03"
    }
    const res = await request(app).post('/directors').send(body)
    directorId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /directors should get a director', async () => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /directors/:id should update a director', async () => {
    const directorUpdated = {
        firstName: "anderson updated"
    }
    const res = await request(app).put(`/directors/${directorId}`).send(directorUpdated)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(directorUpdated.firstName);
});

test('DELETE /directors/:id should delete a director', async () => {
    const res = await request(app).delete(`/directors/${directorId}`)
    expect(res.status).toBe(204);
});