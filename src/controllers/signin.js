const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SUCCESS_AUTH_MESS } = require('../utils/constants');
const { JWT, NODE_PROD } = require('../utils/config');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === NODE_PROD ? JWT_SECRET : JWT,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.send({ message: SUCCESS_AUTH_MESS });
    })
    .catch(next);
};
