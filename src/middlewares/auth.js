require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { UNAUTHORIZED_ERR } = require('../utils/constants');
const { JWT, NODE_PROD } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERR));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === NODE_PROD ? JWT_SECRET : JWT);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERR));
  }
  req.user = payload;
  return next();
};
