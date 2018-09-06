const waterMark = require('../libs/images/waterMark');
const options = require('../../lib/options');
const pool = require('../../lib/database');
const fileResize = require('../libs/images/fileResize');
const filePath = require('../../utils/libs/filePath');
const path = require('path');
const chordMatch = require('../image_recognition/chord-match');
const fs = require('fs');
const specialStrumMatch = require('../image_recognition/special-strum-match');
const octaveMatch = require('../image_recognition/octave-match');
const starMatch = require('../image_recognition/star-match');
const firstNoteMatch = require('../image_recognition/first-note-match');

var songDomain = require('../../server/domains/song');

class ImageFileBuilder {
  constructor() {}

  buildImages() {
    return songDomain.getActiveSongs().then(songs => {
      const requests = songs.map(song => {
        return new Promise(resolve => {
          console.log(`Processings Song for ${song.artist} - ${song.title}`);
          fileResize.resizeImage(song).then(function(results) {
            resolve(results);
            //waterMark.addWaterMark(song);
          });
        });
      });

      return Promise.all(requests);
    });
  }

  resizeImage(song) {
    return fileResize.resizeImage(song).then(function(results) {
      return results;
    });
  }

  processImage(song, originalFilePath) {
    const _this = this;
    const destinationFilePath = path.join(__dirname, filePath.getSourceImagePath(song));

    console.log(`Processings Song for ${song.artist} - ${song.title}`);

    filePath.ensureDirectoryExistence(destinationFilePath);
    //fs.rename(
    return new Promise(resolve => {
      fs.copyFile(
        originalFilePath,
        destinationFilePath,
        () => {
          _this.resizeImage(song).then(result => {
            chordMatch.chordMatch(result.images[0]).then(chords => {
              specialStrumMatch.specialStrumMatch(result.images[2]).then(hasSpecialStrumPattern => {
                starMatch.starMatch(result.images[2]).then(starsFound => {
                  octaveMatch.octaveMatch(result.images[3]).then(octaveFound => {
                    firstNoteMatch.firstNoteMatch(result.images[3]).then(firstNoteFound => {
                      song.firstNote = firstNoteFound;
                      song.flowered = hasSpecialStrumPattern;
                      song.chords = chords.chords.join(', ');
                      song.stars = starsFound;
                      song.octave = octaveFound;

                      songDomain.updateSong(song).then(() => {
                        resolve(song);
                      });
                    });
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
    });
  }
}

module.exports = new ImageFileBuilder();

if (options.isCommandLine()) {
  const imageFileBuilder = new imageFileBuilder();

  iamgeFileBuilder.buildImages().then(function(results) {
    console.log(results);
    pool.end();
    console.log('closing the pool');
  });
}

/*
imageFileBuilder = new ImageFileBuilder();

imageFileBuilder.processImage(
  Object({
    title: 'Manic Monday',
    artist: 'The Bangles',
    imageTop: 79,
    imageBottom: 315 
  }),
  '../../deployment_local/assets/t/the-bangles/manic-monday.png', true).then(song => {
    console.log('Song', song);
  })
  ;
*/
/*
imageFileBuilder
  .processImage(
    Object({
      id: 93,
      title: 'Lady in Red',
      artist: 'Chris Deburgh',
      imageTop: 100,
      imageBottom: 230
    }),
    '../../deployment_local/assets/c/chris-deburgh/lady-in-red.png',
    false
  )
  .then(song => {
    console.log('Song', song);
  });
*/

/*
imageFileBuilder
  .processImage(
    Object({
      id: 16,
      title: "Don't dream it's over",
      artist: 'Crowded House',
      imageTop: 79,
      imageBottom: 180
    }),
    '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over.png',
    false
  )
  .then(song => {
    console.log('Song', song);
  });
  */
