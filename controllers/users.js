const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('../utils/constants');

const {
  NODE_ENV, JWT_SECRET,
} = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcryptjs.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res
        .status(HTTP_STATUS_CREATED)
        .send({
          name: user.name,
          email: user.email,
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(`Пользователь с email: ${email} уже существует.`));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign(
          { userId },
          NODE_ENV === 'production'
            ? JWT_SECRET
            : 'dev-secret',
          { expiresIn: '7d' },
        );
        res
          .send({ token });
      }
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден.'))
    .then((user) => {
      res
        .status(HTTP_STATUS_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные!'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      email,
      name,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден!'))
    .then((user) => {
      res
        .status(HTTP_STATUS_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      if (err.code === 11000) {
        return next(new ConflictError(`Пользователь с email: ${email} уже существует.`));
      }
      return next(err);
    });
};
