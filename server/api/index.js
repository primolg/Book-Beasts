const router = require('express').Router();

// "/api"
router.use('/instructors', require('./instructors'));

//router.use('/auth', require('./auth'));

module.exports = router;
