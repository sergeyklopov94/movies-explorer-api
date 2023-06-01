const router = require('express').Router();

const auth = require('../middlewares/auth');

const DataNotFoundError = require('../errors/data-not-found-err');
const { DATA_NOT_FOUND_PATH_ERR } = require('../utils/constants');

const signupRouter = require('./signup');
const signinRouter = require('./signin');
const signoutRouter = require('./signout');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/signout', auth, signoutRouter);

router.use('*', auth, (req, res, next) => {
  next(new DataNotFoundError(DATA_NOT_FOUND_PATH_ERR));
});

module.exports = router;
