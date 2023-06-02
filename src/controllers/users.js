const User = require('../models/user');

const UncorrectDataError = require('../errors/uncorrect-data-err');
const DataNotFoundError = require('../errors/data-not-found-err');
const ConflictError = require('../errors/conflict-err');

const { DATA_NOT_FOUND_USER_ERR, UNCORRECT_DATA_USER_ERR, CONFLICT_USER_ERR } = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new DataNotFoundError(DATA_NOT_FOUND_USER_ERR);
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new DataNotFoundError(DATA_NOT_FOUND_USER_ERR);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectDataError(UNCORRECT_DATA_USER_ERR));
      }
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_USER_ERR));
      }
      else {
        next(err);
      }
    });
};
