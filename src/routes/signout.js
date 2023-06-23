const router = require('express').Router();

const { logout } = require('../controllers/signout');

router.get('/', logout);

module.exports = router;
