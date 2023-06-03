const moviesRouter = require('express').Router();

const { createMovieValidation, movieIdValidation } = require('../middlewares/movieValidation');

const { getCurrentUserMovies, createMovie, deleteMovieById } = require('../controllers/movies');

moviesRouter.get('/', getCurrentUserMovies);

moviesRouter.post('/', createMovieValidation, createMovie);

moviesRouter.delete('/:_id', movieIdValidation, deleteMovieById);

module.exports = moviesRouter;
