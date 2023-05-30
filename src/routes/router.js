const router = require('express').Router();

const auth = require('../middlewares/auth');

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

module.exports = router;