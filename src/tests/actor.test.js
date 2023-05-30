const request = require('supertest')
const app = require('../app')
require('../models')

let actorId;

test('CREATE /actors should create an actor', async () => {
    const body = {
        firstName: "anderson",
        lastName: "puppi",
        nationality: "peru",
        image: "image.jpg",
        birthday: "2002-04-03"
    }
    const res = await request(app).post('/actors').send(body)
    actorId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
});

test('GET /actors should return an actor', async () => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1)
});

test('PUT /actors/:id should update an actor', async () => {
    const actorUpdated = {
        firstName: "anderson updated"
    }
    const res = await request(app).put(`/actors/${actorId}`).send(actorUpdated)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actorUpdated.firstName);
});

test('DELETE /actors/:id should delete an actor', async () => {
    const res = await request(app).delete(`/actors/${actorId}`)
    expect(res.status).toBe(204);
});