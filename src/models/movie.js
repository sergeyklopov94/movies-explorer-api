const mongoose = require('mongoose');
const validator = require('validator');

const { LINK_VALIDATOR_MESS } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Отсутствует страна создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Отсутствует режиссёр фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Отсутствует длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Отсутствует год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Отсутствует описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Отсутствует ссылка на постер к фильму'],
    validate: {
      validator: (image) => validator.isURL(image, { protocols: ['http', 'https'], require_protocol: true }),
      message: LINK_VALIDATOR_MESS,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Отсутствует ссылку на трейлер фильма'],
    validate: {
      validator: (trailerLink) => validator.isURL(trailerLink, { protocols: ['http', 'https'], require_protocol: true }),
      message: LINK_VALIDATOR_MESS,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Отсутствует миниатюрное изображение постера к фильму'],
    validate: {
      validator: (thumbnail) => validator.isURL(thumbnail, { protocols: ['http', 'https'], require_protocol: true }),
      message: LINK_VALIDATOR_MESS,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Отсутствует _id пользователя, который сохранил фильм'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Отсутствует id фильма'],
  },
  nameRU: {
    type: String,
    required: [true, 'Отсутствует название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Отсутствует название фильма на английском языке'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
