const router = require('express').Router();
const cors = require('cors');
const filePath = require('../../../utils/libs/filePath');
const corsOptions = require('../../libs/cors');
const fs = require('fs');
const path = require('path');
const songDomain = require('../../domains/song');

router.get('', cors(corsOptions), function(req, res) {
  const images = [];

  const imageFolder = '../../deployment_local/unprocessed/';

  fs.readdirSync(imageFolder).forEach(file => {
    if (file.match(/^Book_\d_\d-\d+.png/)) {
      images.push(file);
    }
  });

  res.status(200).json(images);
});

router.post('', cors(corsOptions), function(req, res) {
  const unprocessedFilePath = path.join(__dirname, '..', '..', filePath.getUnprocessedImagePath(req.body['fileName']));
  songDomain.insertSong(req.body).then(function(response) {
    songDomain.getSong(response.insertId).then(function(_song_) {
      if (_song_.length) {
        const song = _song_.pop();
        const destinationFilePath = path.join(__dirname, '..', '..', filePath.getSourceImagePath(song));

        filePath.ensureDirectoryExistence(destinationFilePath);
        fs.rename(
          unprocessedFilePath,
          destinationFilePath,
          () => {
            res.status(200).json(song);
          },
          error => {
            returnError(res, 401, `Sorry, there was an error! ${error.message}`);
          }
        );
      } else {
        returnError(res, 404, 'Sorry, we cannot find that!');
      }
    });
  });
});

module.exports = router;
