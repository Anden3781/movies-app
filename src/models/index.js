const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Genre, {through: 'MoviesGenre'})
Genre.belongsToMany(Movie, {through: 'MoviesGenre'})

Movie.belongsToMany(Actor, {through: 'MoviesActor'})
Actor.belongsToMany(Movie, {through: 'MoviesActor'})

Movie.belongsToMany(Director, {through: 'MoviesDirector'})
Director.belongsToMany(Movie, {through: 'MoviesDirector'})