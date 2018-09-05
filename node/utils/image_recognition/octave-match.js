const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const MatchLibrary = require('./lib/match-library');
const path = require('path');
const octaveEnums = require('../libs/enums/octave-enums');

const maxTolerance = 0.87;
const debug = false;
const displayOutput = false;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);
const pdfFolder = path.join(__dirname, 'data', 'symbols');
const allOctaves = ['octave-higher.png', 'octave-lower.png'];

const startTime = new Date();

function octaveMatch(songPath) {
  let octaveCount = 0;
  let returnOctave = octaveEnums.none;

  return matchLibrary.processImage(songPath).then(function(originalMat) {
    allOctaves.forEach(file => {
      const octaveStartTime = new Date();

      const filePath = path.join(pdfFolder, file);

      const octaveMat = cv.imread(filePath);
      const resultObject = matchLibrary.findWaldo(originalMat, octaveMat, file);

      if (resultObject.match) {
        octaveCount++;
        resultObject.time = timer.timer(octaveStartTime);
        matchLibrary.calibrate(resultObject);
      } else {
        if (debug) {
          matchLibrary.printOutput(`Time: ${timer.timer(octaveStartTime)} ${file} Uncertain`);
        }
      }
    });

    const foundOctaveEntries = matchLibrary.getFoundWaldos();

    if (foundOctaveEntries.length > 1) {
      throw `this is a problem! ${foundOctaveEntries.length} where found`;
    }

    matchLibrary.printOutput('Octaves found:', octaveCount);
    matchLibrary.printOutput('Octaves fixed:', foundOctaveEntries.length);

    foundOctaveEntries.forEach(([key, octave]) => {
      returnOctave = octave.name === allOctaves[0] ? octaveEnums.higher : octaveEnums.lower;
      matchLibrary.printOutput(octave.name, 'Found in', octave.time);
    });

    matchLibrary.printOutput(`Total Time to process ${allOctaves.length} Octaves is ${timer.timer(startTime)}`);

    return returnOctave;
  });
}

module.exports = {
  octaveMatch(songImagePath) {
    return octaveMatch(songImagePath).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

//octaveMatch('../../deployment_local/assets/t/the-bangles/manic-monday.png').then(result => console.log(result));
//octaveMatch( '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over.png').then(result => console.log(result));
//octaveMatch('../../deployment_local/assets/t/toto/africa.png').then(result => console.log(result));
//octaveMatch('../../deployment_local/assets/b/belinda-carlisle/heaven-is-a-place-on-earth.png').then((stars) => console.log('Found', stars));

//octaveMatch('../../deployment_local/assets/c/chris-deburgh/lady-in-red.png').then(result => console.log(result));
//octaveMatch('../../deployment_local/assets/e/erasure/blue-savannah.png').then(result => console.log(result));
