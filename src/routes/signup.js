const router = require('express').Router();

const { createUserValidation } = require('../middlewares/userValidation');

const { createUser } = require('../controllers/signup');

router.post('/', createUserValidation, createUser);

module.exports = router;
