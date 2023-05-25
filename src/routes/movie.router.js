const { getAll, create, getOne, remove, update, setMovieActor, setMovieGenre, setMovieDirector } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(setMovieGenre)

movieRouter.route('/:id/actors')
    .post(setMovieActor)

movieRouter.route('/:id/directors')
    .post(setMovieDirector)

module.exports = movieRouter;