module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Осуществлен выход с Вашего аккаунта' });
  } catch (err) {
    next(err);
  }
};