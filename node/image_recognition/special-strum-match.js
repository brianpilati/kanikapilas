const cv = require('opencv4nodejs');
const timer = require('../lib/time');
const MatchLibrary = require('./lib/match-library');

const maxTolerance = 0.95;
const debug = false;
const displayOutput = true;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

const startTime = new Date();

function specialStrumMatch(songPath) {
  const processImageOptions = Object({
    crop: true,
    cropHeight: 100
  });
  return matchLibrary.processImage(songPath, processImageOptions).then(function(originalMat) {
    const filePath = './data/symbols/special-strum-pattern-icon.png';

    const chordStartTime = new Date();
    const specialStrumMat = cv.imread(filePath); //.resizeToMax(75);
    const resultObject = matchLibrary.findWaldo(originalMat, specialStrumMat, 'flower');

    if (resultObject.match) {
      resultObject.time = timer.timer(chordStartTime);
      matchLibrary.calibrate(resultObject);
    } else {
      if (debug) {
        matchLibrary.printOutput(`Time: ${timer.timer(chordStartTime)} flower Not Found`);
      }
    }

    const foundEntries = Object.entries(matchLibrary.getFoundWaldos());

    foundEntries.forEach(([key, strumPattern]) => {
      matchLibrary.printOutput(strumPattern.name, 'Found in', strumPattern.time);
    });

    matchLibrary.printOutput(`Total Time to process is ${timer.timer(startTime)}`);

    return true;
  });
}

module.exports = {
  specialStrumMatch(songImagePath) {
    specialStrumMatch(songImagePath).then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
};

//specialStrumMatch('../../deployment_local/assets/t/the-bangles/manic-monday.png');
//specialStrumMatch( '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over.png');
//specialStrumMatch('../../deployment_local/assets/t/toto/africa.png');
specialStrumMatch('../../deployment_local/assets/b/belinda-carlisle/heaven-is-a-place-on-earth.png');
