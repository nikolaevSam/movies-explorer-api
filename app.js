const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const app = express();

const handlerError = require('./middlewares/handlerError');
const auth = require('./middlewares/auth');
const router = require('./routes/app');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const { createUser, login } = require('./controllers/users');
const { createUserValidation, loginValidation } = require('./middlewares/validation');

const {
  PORT = 3000, URL,
} = process.env;

mongoose.connect(URL);
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);
app.use(auth);
app.use('/', router);
app.use(errorLogger);
app.use(rateLimiter);
app.use(errors({ message: 'Ошибка валидации Joi!' }));
app.use(handlerError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
