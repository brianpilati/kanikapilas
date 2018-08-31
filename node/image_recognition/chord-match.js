const cv = require('opencv4nodejs');
const { Image } = require('image-js');
const fs = require('fs');
const path = require('path');
const timer = require('../lib/time');
const MatchLibrary = require('./lib/match-library');

const debug = false;
const displayOutput = true;

const matchLibrary = new MatchLibrary(0.58, debug, displayOutput);

const testChord = 'c.png';
const foundChords = Object({});

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

function calibrateChord(chordObject) {
  const minPosition = chordObject.x - 5;
  const maxPosition = chordObject.x + 5;
  let foundCount = 0;
  let foundPosition = chordObject.x;
  for (let index = minPosition; index < maxPosition; index++) {
    if (foundChords.hasOwnProperty(index)) {
      foundCount++;
      foundPosition = index;
    }
  }

  if (foundCount > 1) {
    throw `This is bad -- found count is: ${foundCount} for ${chordObject.name}`;
  }

  if (foundCount === 1) {
    const foundChord = foundChords[foundPosition];
    if (chordObject.distance > foundChord.distance) {
      foundChords[foundPosition] = chordObject;
    }
  } else {
    foundChords[chordObject.x] = chordObject;
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
        const resultObject = matchLibrary.findChord(originalMat, chordMat, file);

        if (resultObject.match) {
          chordCount++;
          resultObject.time = timer.timer(chordStartTime);
          calibrateChord(resultObject);
        } else {
          if (debug) {
            matchLibrary.printOutput(`Time: ${timer.timer(chordStartTime)} ${file} Uncertain`);
          }
        }
      }
    });

    const foundChordEntries = Object.entries(foundChords);
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
chordMatch('../../deployment/assets/t/toto/africa_1.png');
