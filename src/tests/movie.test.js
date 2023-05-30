const request = require('supertest')
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models')

let movieId;

test('POST /movies should create a movie', async () => {
    const body = {
        name: "fast and furious",
        image: "image.jpg",
        synopsis: "synopsis test",
        releaseYear: 2014
    }
    const res = await request(app).post('/movies').send(body)
    movieId = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('POST /movies/:id/genres should set the movies genres', async () => {
    const genres = await Genre.create({
        name: "terror"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genres.id])
    await genres.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/actors should set the movie actors', async () => {
    const actors = await Actor.create({
        firstName: "anderson",
        lastName: "puppi",
        nationality: "peru",
        image: "image.jpg",
        birthday: "2002-04-03"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actors.id])
    await actors.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors should set a movie director', async () => {
    const director = await Director.create({
        firstName: "hola",
        lastName: "samyr",
        nationality: "peru",
        image: "img.jpg",
        birthday: "2002-04-03"
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id])
    await director.destroy()
    expect(res.status).toBe(200);
});

test('GET /movies should return a movie', async () => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].genres).toBeDefined();
});

test('PUT /movies/:id should update a movie', async () => {
    const movieUpdated = {
        name: "anderson updated"
    }
    const res = await request(app).put(`/movies/${movieId}`).send(movieUpdated)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movieUpdated.name);
});

test('DELETE /movies/:id should delete a movie', async () => {
    const res = await request(app).delete(`/movies/${movieId}`)
    expect(res.status).toBe(204);
});