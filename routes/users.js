const usersRouter = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUserValidation, updateUser);

module.exports = usersRouter;
