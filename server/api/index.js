const router = require('express').Router();

// "/api"
// router.use();
router.use('/instructors', require('./instructors'));

module.exports = router;
