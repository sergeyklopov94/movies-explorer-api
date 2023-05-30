const User = require('../models/user');

const UncorrectDataError = require('../errors/uncorrect-data-err');
const DataNotFoundError = require('../errors/data-not-found-err');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new DataNotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new DataNotFoundError('Такого пользователя не существует');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new UncorrectDataError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};