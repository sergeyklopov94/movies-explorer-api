const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Заполните поле Email'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле Пароль'],
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Заполните поле Имя'],
  },
}, { toObject: { useProjection: true }, toJSON: { useProjection: true } });

module.exports = mongoose.model('user', userSchema);