const moviesRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:movieId', deleteMovieById);

module.exports = moviesRouter;
