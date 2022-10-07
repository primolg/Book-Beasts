const router = require('express').Router();

// "/api"
// router.use();
router.use('/instructors', require('./instructors'));
router.use('/books', require('./books'));

module.exports = router;
