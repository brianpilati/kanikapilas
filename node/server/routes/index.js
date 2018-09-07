var router = require('express').Router();

router.use('/songs', require('./songs'));
router.use('/twitter', require('./communication/twitter/index.js'));
router.use('/image-processing', require('./image-processing'));
module.exports = router;
