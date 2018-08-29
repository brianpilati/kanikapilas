var router = require('express').Router();

router.use('/songs', require('./songs'));
router.use('/image-processing', require('./image-processing'));
module.exports = router;
