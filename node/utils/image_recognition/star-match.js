const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const MatchLibrary = require('./lib/match-library');
const path = require('path');

const maxTolerance = 0.93;
const debug = false;
const displayOutput = false;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

const startTime = new Date();

function starMatch(songPath) {
  return matchLibrary.processImage(songPath).then(function(originalMat) {
    const filePath = path.join(__dirname, 'data', 'symbols', 'star.png');

    const starMat = cv.imread(filePath);
    const foundStars = matchLibrary.findWaldos(originalMat, starMat);

    matchLibrary.printOutput(`Total Time to process is ${timer.timer(startTime)}`);

    return foundStars;
  });
}

module.exports = {
  starMatch(songImagePath) {
    return starMatch(songImagePath).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

//starMatch('../../deployment_local/assets/t/the-bangles/manic-monday.png').then(result => console.log(result));
//starMatch( '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over.png').then(result => console.log(result));
//starMatch('../../deployment_local/assets/t/toto/africa.png').then(result => console.log(result));
//starMatch('../../deployment_local/assets/b/belinda-carlisle/heaven-is-a-place-on-earth.png').then((stars) => console.log('Found', stars));

//starMatch('../../deployment_local/assets/c/chris-deburgh/lady-in-red.png').then(result => console.log(result));
