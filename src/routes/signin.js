const router = require('express').Router();

const { loginValidation } = require('../middlewares/userValidation');

const { login } = require('../controllers/signin');

router.post('/', loginValidation, login);

module.exports = router;
