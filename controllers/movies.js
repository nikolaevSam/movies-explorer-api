const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const { userId } = req.user;

  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { userId } = req.user;

  return Movie.countDocuments({})
    .then((movieId) => {
      Movie.create({ ...req.body, owner: userId, movieId })
        .then((movie) => {
          res
            .status(HTTP_STATUS_CREATED)
            .send(movie);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  const { userId } = req.user;

  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм по указанному _id не найден.'))
    .then((movie) => {
      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== userId) {
        throw new ForbiddenError('Фильм невозможно удалить.');
      }
      return movie.deleteOne();
    })
    .then(() => {
      res
        .status(HTTP_STATUS_OK)
        .send({ message: 'Фильм удалён.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные.'));
      }
      return next(err);
    });
};
