const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const { createUser, login } = require('../controllers/users');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', createUser);
router.post('/signin', login);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', () => {
  throw new NotFoundError('Not Found');
});

module.exports = router;
