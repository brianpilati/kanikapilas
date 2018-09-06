const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const MatchLibrary = require('./lib/match-library');
const imageLibrary = require('../libs/images/image-library');
const path = require('path');
const { Image } = require('image-js');
const filePath = require('../libs/filePath');
const tesseractMatch = require('./tesseract-match');

const maxTolerance = 0.55;
const debug = false;
const displayOutput = false;

const startTime = new Date();

function artistNameFix(artist) {
  const artistCorrections = Object({
    'BilVy Joel': 'Billy Joel'
  });

  return artistCorrections.hasOwnProperty(artist) ? artistCorrections[artist] : artist;
}

function getArtistNameByImage(xyCoordinates, artistImagePath) {
  const matchLibrary = new MatchLibrary(0, false, false);
  return Image.load(artistImagePath).then(function(image) {
    const boundary = imageLibrary.getArtistCoordinates(image, xyCoordinates);

    const artistImage = image.crop(boundary);

    artistImagePath = `/tmp/file-artist-${filePath.getFileGuid()}.png`;

    return artistImage.save(artistImagePath).then(function() {
      return tesseractMatch.findWords(artistImagePath, 1200).then(results => {
        return artistNameFix(matchLibrary.parseOCRWord(results));
      });
    });
  });
}

function artistsMatch(songPath, tolerance) {
  const matchLibrary = new MatchLibrary(tolerance, debug, displayOutput);
  return matchLibrary.processImage(songPath).then(function(originalMat) {
    const filePath = path.join(__dirname, 'data', 'symbols', 'artist.png');

    const artistMat = cv.imread(filePath);
    const foundArtist = matchLibrary.findWaldos(originalMat, artistMat);

    matchLibrary.printOutput(`Total Time to process is ${timer.timer(startTime)}`);

    return foundArtist;
  });
}

function artistMatch(songPath) {
  const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

  return matchLibrary.processImage(songPath).then(function(originalMat) {
    const filePath = path.join(__dirname, 'data', 'symbols', 'artist.png');

    const artistMat = cv.imread(filePath); //.resizeToMax(50);
    const foundArtist = matchLibrary.findWaldo(originalMat, artistMat);

    matchLibrary.printOutput(`Total Time to process is ${timer.timer(startTime)}`);

    return foundArtist;
  });
}

module.exports = {
  artistMatch(songImagePath) {
    return artistMatch(songImagePath).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  },

  getArtistNameByImage(imagePath) {
    return artistMatch(imagePath, maxTolerance).then(results => {
      const xyCoordinates = Object({
        x: results.x,
        y: results.y
      });

      return getArtistNameByImage(xyCoordinates, imagePath);
    });
  },

  artistsMatch(songImagePath, tolerance) {
    tolerance = tolerance || maxTolerance;
    return artistsMatch(songImagePath, tolerance).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

//artistMatch('../../deployment_local/assets/t/the-bangles/manic-monday.png').then(result => console.log(result));
//artistMatch( '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over.png').then(result => console.log(result));
//artistMatch('../../deployment_local/assets/t/toto/africa.png').then(result => console.log(result));
//artistMatch('../../deployment_local/assets/b/belinda-carlisle/heaven-is-a-place-on-earth.png').then((stars) => console.log('Found', stars));

//artistMatch('../../deployment_local/assets/c/chris-deburgh/lady-in-red.png').then(result => console.log(result));
//artistsMatch('../../deployment_local/assets/c/chris-deburgh/lady-in-red.png').then(result => console.log(result));
