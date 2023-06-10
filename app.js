require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

const { PORT, URL } = process.env;

mongoose.connect(URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(helmet());

app.listen(() => {
  console.log(`App listening on port ${PORT}!`);
});
