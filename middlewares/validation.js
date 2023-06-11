const { Joi, celebrate } = require('celebrate');

const BadRequestError = require('../errors/BadRequestError');
const { linkRegex, idRegex } = require('../utils/constants');

const urlValidation = (url) => {
  if (linkRegex.test(url)) {
    return url;
  } return BadRequestError('Некорректный URL.');
};

const idValidation = (id) => {
  if (idRegex.test(id)) {
    return id;
  } return BadRequestError('Некорректный id');
};

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(20),
    director: Joi.string().required().min(2).max(20),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required().min(5).max(30),
    image: Joi.string().custom(urlValidation).required(),
    trailerLink: Joi.string().custom(urlValidation).required(),
    thumbnail: Joi.string().custom(urlValidation).required(),
    nameRU: Joi.string().required().min(2).max(20),
    nameEN: Joi.string().required().min(2).max(20),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().custom(idValidation).required(),
  }),
});
