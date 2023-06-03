const bcrypt = require('bcryptjs');
const User = require('../models/user');

const UncorrectDataError = require('../errors/uncorrect-data-err');
const ConflictError = require('../errors/conflict-err');

const { CONFLICT_SIGNUP_ERR, UNCORRECT_DATA_SIGNUP_ERR } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_SIGNUP_ERR));
      }
      if (err.name === 'ValidationError') {
        next(new UncorrectDataError(UNCORRECT_DATA_SIGNUP_ERR));
      } else {
        next(err);
      }
    });
};
