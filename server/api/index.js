const router = require('express').Router();

// "/api"
router.use('/instructors', require('./instructors'));
router.use('/books', require('./books'));
router.use('/students', require('./students'))

router.use('/auth', require('./auth'));

module.exports = router;
