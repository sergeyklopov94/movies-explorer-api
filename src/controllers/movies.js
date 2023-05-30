const Movie = require('../models/movie');

const UncorrectDataError = require('../errors/uncorrect-data-err');
const DataNotFoundError = require('../errors/data-not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

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
    nameEN } = req.body;
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
    owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectDataError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  console.log(req.params.movieId);
  Movie.findOne({ movieId: req.params.movieId })
    .populate('owner')
    .then((movie) => {
      console.log(movie.owner._id.toString());
      console.log(req.user._id);
      if (movie.length === 0) {
        throw new DataNotFoundError('Такого фильма не существует');
      } else if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено удаление фильма другого пользователя');
      }
      Movie.findOneAndDelete({ movieId: req.params.movieId })
        .populate('owner')
        .then(() => res.send({ message: 'Фильм удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new UncorrectDataError('Указан некорректный _id фильма'));
      } else {
        next(err);
      }
    });
};