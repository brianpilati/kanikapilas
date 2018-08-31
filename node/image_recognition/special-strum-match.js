const cv = require('opencv4nodejs');
const { Image } = require('image-js');
const timer = require('../lib/time');
const MatchLibrary = require('./lib/match-library');

const maxTolerance = 0.95;
const debug = false;
const displayOutput = false;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

function processImage(songImage) {
  try {
    const start = new Date();

    return Image.load(songImage).then(function(image) {
      const croppedImage = image.crop({
        height: 100
      });

      const savedImagePath = `/tmp/song_cropped.png`;
      return croppedImage.save(savedImagePath).then(function() {
        let originalMat = cv.imread(savedImagePath);

        matchLibrary.printOutput(`Parse Song Time: ${timer.timer(start)}`);

        return originalMat;
      });
    });
  } catch (error) {
    matchLibrary.printOutput('Error: ', error);
  }
}

const startTime = new Date();

function specialStrumMatch(songImage) {
  return processImage(songImage).then(function(originalMat) {
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
//specialStrumMatch('../../deployment_local/assets/b/belinda-carlisle/heaven-is-a-place-on-earth.png');
