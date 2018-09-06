const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const MatchLibrary = require('./lib/match-library');
const path = require('path');

const maxTolerance = 0.9;
const debug = false;
const displayOutput = false;

const startTime = new Date();

function capoMatch(songPath) {
  const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

  return matchLibrary.processImage(songPath).then(function(originalMat) {
    const filePath = path.join(__dirname, 'data', 'symbols', 'capo.png');

    const capoMat = cv.imread(filePath); //.resizeToMax(50);
    const foundCapo = matchLibrary.findWaldo(originalMat, capoMat);

    matchLibrary.printOutput(`Total Time to process is ${timer.timer(startTime)}`);

    return foundCapo.match;
  });
}

module.exports = {
  capoMatch(songImagePath) {
    return capoMatch(songImagePath).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

//capoMatch('../../../deployment_local/assets/b/billy-joel/the-longest-time.png').then(result => console.log(result));
//capoMatch('../../../deployment_local/assets/b/billy-joel/the-piano-man.png').then(result => console.log(result));
