const cv = require('opencv4nodejs');
const fs = require('fs');
const path = require('path');
const timer = require('../lib/time');
const MatchLibrary = require('./lib/match-library');

const maxTolerance = 0.58;
const debug = false;
const displayOutput = false;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

const testChord = 'c.png';

function parseChord(chord) {
  return debug ? chord === testChord : true;
}

const startTime = new Date();

function chordMatch(songPath) {
  const processImageOptions = Object({
    crop: true,
    cropHeight: 75,
    rotate: true,
    resizeToMax: true,
    resizeToMaxValue: 1500
  });

  return matchLibrary.processImage(songPath, processImageOptions).then(function(originalMat) {
    const pdfFolder = path.join(__dirname, 'data', 'chords');
    let chordCount = 0;
    const allChords = fs.readdirSync(pdfFolder);
    const resultObject = Object({
      chords: []
    });

    allChords.forEach(file => {
      if (parseChord(file)) {
        const chordStartTime = new Date();

        const filePath = path.join(pdfFolder, file);

        const chordMat = cv.imread(filePath).resizeToMax(120);
        const resultObject = matchLibrary.findWaldo(originalMat, chordMat, file);

        if (resultObject.match) {
          chordCount++;
          resultObject.time = timer.timer(chordStartTime);
          matchLibrary.calibrate(resultObject);
        } else {
          if (debug) {
            matchLibrary.printOutput(`Time: ${timer.timer(chordStartTime)} ${file} Uncertain`);
          }
        }
      }
    });

    const foundChordEntries = matchLibrary.getFoundWaldos();
    matchLibrary.printOutput('Chords found:', chordCount);
    matchLibrary.printOutput('Chords fixed:', foundChordEntries.length);

    foundChordEntries.forEach(chord => {
      resultObject.chords.push(chord.name);
      matchLibrary.printOutput(chord.name, 'Found in', chord.time);
    });

    matchLibrary.printOutput(`Total Time to process ${allChords.length} Chords is ${timer.timer(startTime)}`);

    return resultObject;
  });
}

module.exports = {
  chordMatch(songImagePath) {
    return chordMatch(songImagePath).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

//chordMatch('../../deployment/assets/t/the-bangles/manic-monday_1.png');
//chordMatch( '../../deployment/assets/c/crowded-house/don-t-dream-it-s-over_1.png');
//chordMatch('../../deployment/assets/t/toto/africa_1.png');
//chordMatch('../../deployment/assets/b/belinda-carlisle/heaven-is-a-place-on-earth_1.png').then(chords => console.log('Chords Found', chords));

//chordMatch('../../deployment/assets/c/chris-deburgh/lady-in-red_1.png');
