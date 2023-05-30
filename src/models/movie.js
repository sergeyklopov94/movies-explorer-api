const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Заполните страну создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Заполните режиссёра фильма'],
  },
  duration: {
    type: String,
    required: [true, 'Заполните длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Заполните год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Заполните описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Заполните ссылку на постер к фильму'],
    validate: {
      validator: (image) => validator.isURL(image, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Некорректный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Заполните ссылку на трейлер фильма'],
    validate: {
      validator: (trailerLink) => validator.isURL(trailerLink, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Некорректный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Заполните миниатюрное изображение постера к фильму'],
    validate: {
      validator: (thumbnail) => validator.isURL(thumbnail, { protocols: ['http', 'https'], require_protocol: true }),
      message: 'Некорректный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Заполните _id пользователя, который сохранил фильм'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Заполните id фильма'],
  },
  nameRU: {
    type: String,
    required: [true, 'Заполните название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Заполните название фильма на английском языке'],
  },
});

module.exports = mongoose.model('movie', movieSchema);