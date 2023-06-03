const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-err');

const { UNAUTHORIZED_AUTH_ERR, EMAIL_VALIDATOR_MESS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Отсутствует Email пользователя'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: EMAIL_VALIDATOR_MESS,
    },
  },
  password: {
    type: String,
    required: [true, 'Отсутствует Пароль пользователя'],
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Отсутствует Имя пользователя'],
  },
}, { toObject: { useProjection: true }, toJSON: { useProjection: true } });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(UNAUTHORIZED_AUTH_ERR));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(UNAUTHORIZED_AUTH_ERR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
