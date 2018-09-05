const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const MatchLibrary = require('./lib/match-library');
const path = require('path');

const maxTolerance = 0.95;
const debug = false;
const displayOutput = false;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

const startTime = new Date();

function specialStrumMatch(songPath) {
  return matchLibrary.processImage(songPath).then(function(originalMat) {
    let patternFoundResult = false;
    const filePath = path.join(__dirname, 'data', 'symbols', 'special-strum-pattern-icon.png');

    const chordStartTime = new Date();
    const specialStrumMat = cv.imread(filePath);
    const resultObject = matchLibrary.findWaldo(originalMat, specialStrumMat, 'flower');

    if (resultObject.match) {
      resultObject.time = timer.timer(chordStartTime);
      matchLibrary.calibrate(resultObject);
    } else {
      if (debug) {
        matchLibrary.printOutput(`Time: ${timer.timer(chordStartTime)} flower Not Found`);
      }
    }

    const foundEntries = matchLibrary.getFoundWaldos();

    foundEntries.forEach(strumPattern => {
      patternFoundResult = true;
      matchLibrary.printOutput(strumPattern.name, 'Found in', strumPattern.time);
    });

    matchLibrary.printOutput(`Total Time to process is ${timer.timer(startTime)}`);

    return patternFoundResult;
  });
}

module.exports = {
  specialStrumMatch(songImagePath) {
    return specialStrumMatch(songImagePath).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

//specialStrumMatch('../../deployment_local/assets/t/the-bangles/manic-monday.png');
//specialStrumMatch( '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over.png');
//specialStrumMatch('../../deployment_local/assets/t/toto/africa.png');
//specialStrumMatch('../../deployment_local/assets/b/belinda-carlisle/heaven-is-a-place-on-earth.png');

//specialStrumMatch('../../deployment_local/assets/c/chris-deburgh/lady-in-red.png').then(result => console.log(result));
