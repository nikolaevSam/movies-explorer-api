require('dotenv').config();
const express = require('express');
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

const {
  PORT = 3000, URL,
} = process.env;

mongoose.connect(URL);
app.use(requestLogger)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use(cors())
  .use(helmet())
  .use(router)
  .use(auth)
  .use(handlerError)
  .use(errorLogger)
  .use(rateLimiter)
  .use(errors({ message: 'Ошибка валидации Joi!' }))
  .listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
