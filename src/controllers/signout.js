const { SUCCESS_LOGOUT_MESS } = require('../utils/constants');

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: SUCCESS_LOGOUT_MESS });
  } catch (err) {
    next(err);
  }
};
