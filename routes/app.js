const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const { createUser, login } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../middlewares/validation');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('/*', () => {
  throw new NotFoundError('Not Found');
});

module.exports = router;
