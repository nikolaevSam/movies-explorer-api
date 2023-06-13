const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    director: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (image) => validator.isURL(image),
        message: 'Введите ссылку!',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (trailerLink) => validator.isURL(trailerLink),
        message: 'Введите ссылку!',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (thumbnail) => validator.isURL(thumbnail),
        message: 'Введите ссылку!',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    nameEN: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
