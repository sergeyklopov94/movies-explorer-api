const Movie = require('../models/movie');

const UncorrectDataError = require('../errors/uncorrect-data-err');
const DataNotFoundError = require('../errors/data-not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  UNCORRECT_DATA_MOVIE_ERR,
  DATA_NOT_FOUND_MOVIE_ERR,
  FORBIDDEN_MOVIE_ERR,
  CAST_MOVIE_ERR,
  DELETED_MOVIE_MESS,
} = require('../utils/constants');
const movie = require('../models/movie');

module.exports.getCurrentUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectDataError(UNCORRECT_DATA_MOVIE_ERR));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findOne({ _id: req.params._id })
    .populate('owner')
    .then((movie) => {
      console.log(movie);
      if (movie === null) {
        throw new DataNotFoundError(DATA_NOT_FOUND_MOVIE_ERR);
      } else if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_MOVIE_ERR);
      }
      Movie.findOneAndDelete({ _id: req.params._id })
        .populate('owner')
        .then(() => res.send({ message: DELETED_MOVIE_MESS }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new UncorrectDataError(CAST_MOVIE_ERR));
      } else {
        next(err);
      }
    });
};
