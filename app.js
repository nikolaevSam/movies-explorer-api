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

const { PORT, URL } = process.env;

mongoose.connect(URL);
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(helmet());
app.use(auth);
app.use(router);
app.use(handlerError);
app.use(errorLogger);
app.use(errors({ message: 'Ошибка валидации Joi!' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
