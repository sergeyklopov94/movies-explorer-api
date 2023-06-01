const { celebrate, Joi } = require('celebrate');
const { REGEX_FOR_URL } = require('../utils/constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEX_FOR_URL),
    trailerLink: Joi.string().required().regex(REGEX_FOR_URL),
    thumbnail: Joi.string().required().regex(REGEX_FOR_URL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  createMovieValidation,
  movieIdValidation,
};
