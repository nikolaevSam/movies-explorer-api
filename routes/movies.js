const moviesRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { movieIdValidation, movieCreateValidation } = require('../middlewares/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieCreateValidation, createMovie);
moviesRouter.delete('/:movieId', movieIdValidation, deleteMovieById);

module.exports = moviesRouter;
