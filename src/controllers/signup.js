const bcrypt = require('bcryptjs');
const User = require('../models/user');

const UncorrectDataError = require('../errors/uncorrect-data-err');
const ConflictError = require('../errors/conflict-err');

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
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь уже существует'));
      }
      if (err.name === 'ValidationError') {
        next(new UncorrectDataError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};