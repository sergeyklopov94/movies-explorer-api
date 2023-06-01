const REGEX_FOR_URL = /(https?:\/\/)?(www\.)?([\w-]{1,32}\.[\w-]{1,5})([\w\d\-._~:/?#[\]@!$&'()*+,;=]*)/;

const DATA_NOT_FOUND_PATH_ERR = 'Несуществующий путь';
const INTERNAL_SERVER_ERR = 'На сервере произошла ошибка';
const UNAUTHORIZED_ERR = 'Необходима авторизация';
const UNAUTHORIZED_AUTH_ERR = 'Неверный email или пароль';
const CONFLICT_SIGNUP_ERR = 'Пользователь уже существует';
const UNCORRECT_DATA_SIGNUP_ERR = 'Переданы некорректные данные при создании пользователя';
const UNCORRECT_DATA_MOVIE_ERR = 'Переданы некорректные данные при создании фильма';
const DATA_NOT_FOUND_MOVIE_ERR = 'Такого фильма не существует';
const FORBIDDEN_MOVIE_ERR = 'Запрещено удаление фильма другого пользователя';
const CAST_MOVIE_ERR = 'Указан некорректный _id фильма';
const DATA_NOT_FOUND_USER_ERR = 'Такого пользователя не существует';
const UNCORRECT_DATA_USER_ERR = 'Переданы некорректные данные при обновлении профиля';

const SUCCESS_AUTH_MESS = 'Авторизация прошла успешно';
const SUCCESS_LOGOUT_MESS = 'Осуществлен выход с Вашего аккаунта';
const EMAIL_VALIDATOR_MESS = 'Некорректный формат email';
const LINK_VALIDATOR_MESS = 'Некорректный формат ссылки';
const DELETED_MOVIE_MESS = 'Фильм удален';
const START_SERVER_MESS = 'Сервер запущен';

module.exports = {
  REGEX_FOR_URL,
  DATA_NOT_FOUND_PATH_ERR,
  INTERNAL_SERVER_ERR,
  UNAUTHORIZED_ERR,
  UNAUTHORIZED_AUTH_ERR,
  CONFLICT_SIGNUP_ERR,
  UNCORRECT_DATA_SIGNUP_ERR,
  UNCORRECT_DATA_MOVIE_ERR,
  DATA_NOT_FOUND_MOVIE_ERR,
  FORBIDDEN_MOVIE_ERR,
  CAST_MOVIE_ERR,
  UNCORRECT_DATA_USER_ERR,
  DATA_NOT_FOUND_USER_ERR,
  SUCCESS_AUTH_MESS,
  SUCCESS_LOGOUT_MESS,
  EMAIL_VALIDATOR_MESS,
  LINK_VALIDATOR_MESS,
  DELETED_MOVIE_MESS,
  START_SERVER_MESS,
};
