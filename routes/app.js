const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', () => {
  throw new NotFoundError('Not Found');
});

module.exports = router;
