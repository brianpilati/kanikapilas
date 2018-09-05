const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const MatchLibrary = require('./lib/match-library');
const path = require('path');

const maxTolerance = 0.55;
const debug = false;
const displayOutput = false;

const startTime = new Date();

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