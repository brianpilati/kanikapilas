const cv = require('opencv4nodejs');
const { Image } = require('image-js');
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

function processImage(songImage) {
  try {
    const start = new Date();

    return Image.load(songImage).then(function(image) {
      const croppedImage = image.crop({
        height: 50
      });

      const savedImagePath = `/tmp/song_cropped.png`;
      return croppedImage.save(savedImagePath).then(function() {
        let originalMat = cv
          .imread(savedImagePath)
          .rotate(cv.ROTATE_180)
          .resizeToMax(1500);

        matchLibrary.printOutput(`Parse Song Time: ${timer.timer(start)}`);

        return originalMat;
      });
    });
  } catch (error) {
    matchLibrary.printOutput('Error: ', error);
  }
}

const startTime = new Date();

function chordMatch(songImage) {
  return processImage(songImage).then(function(originalMat) {
    const pdfFolder = './data/chords';
    let chordCount = 0;
    const allChords = fs.readdirSync(pdfFolder);

    allChords.forEach(file => {
      if (parseChord(file)) {
        const chordStartTime = new Date();

        const filePath = path.join('data', 'chords', file);

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

    const foundChordEntries = Object.entries(matchLibrary.getFoundWaldos());
    matchLibrary.printOutput('Chords found:', chordCount);
    matchLibrary.printOutput('Chords fixed:', foundChordEntries.length);

    foundChordEntries.forEach(([key, chord]) => {
      matchLibrary.printOutput(chord.name, 'Found in', chord.time);
    });

    matchLibrary.printOutput(`Total Time to process ${allChords.length} Chords is ${timer.timer(startTime)}`);

    return true;
  });
}

module.exports = {
  chordMatch(songImagePath) {
    chordMatch(songImagePath).then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
};

//chordMatch('../../deployment/assets/t/the-bangles/manic-monday_1.png');
//chordMatch( '../../deployment/assets/c/crowded-house/don-t-dream-it-s-over_1.png');
//chordMatch('../../deployment/assets/t/toto/africa_1.png');
//chordMatch('../../deployment/assets/b/belinda-carlisle/heaven-is-a-place-on-earth_1.png');
