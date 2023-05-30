const request = require('supertest')
const app = require('../app')
require('../models')

let genreId;

test('POST /genres should create a genre', async () => {
    const body = {
        name: "action"
    }
    const res = await request(app).post('/genres').send(body)
    genreId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /genres should get a genre', async () => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    // expect(res.body[0].movies).toBeDefined();
});

test('PUT /genres should update a genre', async () => {
    const genreUpdated = {
        name: "action updated"
    }
    const res = await request(app).put(`/genres/${genreId}`).send(genreUpdated)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name);
});

test('DELETE /genres should delete a genre', async () => {
    const res = await request(app).delete(`/genres/${genreId}`)
    expect(res.status).toBe(204);
});
