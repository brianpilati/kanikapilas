const router = require('express').Router();
const cors = require('cors');
const filePath = require('../../../utils/libs/filePath');
const corsOptions = require('../../libs/cors');
const fs = require('fs');
const path = require('path');
const songDomain = require('../../domains/song');
const imageFileBuilder = require('../../../utils/imageFileBuilder');
const chordMatch = require('../../../image_recognition/chord-match');
const specialStrumMatch = require('../../../image_recognition/special-strum-match');

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
        //fs.rename(
        fs.copyFile(
          unprocessedFilePath,
          destinationFilePath,
          () => {
            imageFileBuilder.resizeImage(song).then(result => {
              chordMatch.chordMatch(result.images[0]).then(chords => {
                specialStrumMatch.specialStrumMatch(destinationFilePath).then(hasSpecialStrumPattern => {
                  starMatch.starMatch(destinationFilePath).then(starsFound => {
                    song.imageTop = (song.imageTop * 800) / 1035 + 13;
                    song.imageBottom = (song.imageBottom * 800) / 1035 + 75 - 13;

                    song.flowered = hasSpecialStrumPattern;
                    song.chords = chords.chords.join('');
                    song.stars = starsFound;

                    songDomain.updateSong(song).then(() => {
                      console.log('all done');
                      res.status(200).json(song);
                    });
                  });
                });
              });
            });
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
