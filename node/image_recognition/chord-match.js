const cv = require('opencv4nodejs');
const { Image } = require('image-js');
const fs = require('fs');
const path = require('path');
const timer = require('../lib/time');

const debug = false;
const displayOutput = false;
const testChord = 'c.png';
const foundChords = Object({});
const maxTolerance = 0.58;

function parseChord(chord) {
  return debug ? chord === testChord : true;
}

function printOutput() {
  if (displayOutput) {
    console.log.apply(null, arguments);
  }
}

const findChord = (originalMat, chordMat, chordName) => {
  // Match template (the brightest locations indicate the highest match)
  const matched = originalMat.matchTemplate(chordMat, 5);

  // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
  const minMax = matched.minMaxLoc();
  if (debug) {
    printOutput(minMax);

    const {
      maxLoc: { x, y }
    } = minMax;

    // Draw bounding rectangle
    originalMat.drawRectangle(new cv.Rect(x, y, chordMat.cols, chordMat.rows), new cv.Vec(0, 255, 0), 2, cv.LINE_8);

    printOutput(minMax.maxVal, maxTolerance, minMax.maxVal > maxTolerance);

    printOutput(
      minMax.maxVal - minMax.minVal,
      minMax.minVal + minMax.maxVal,
      minMax.minVal,
      minMax.maxVal,
      maxTolerance,
      minMax.maxVal > maxTolerance
    );

    cv.imshow("We've found the chord!", originalMat);
    cv.waitKey();
  }

  return Object({
    x: minMax.maxLoc.x,
    distance: minMax.maxVal,
    match: minMax.maxVal > maxTolerance,
    chordName: chordName
  });
};

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

        printOutput(`Parse Song Time: ${timer.timer(start)}`);

        return originalMat;
      });
    });
  } catch (error) {
    printOutput('Error: ', error);
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
    throw `This is bad -- found count is: ${foundCount} for ${chordObject.chordName}`;
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
        const resultObject = findChord(originalMat, chordMat, file);

        if (resultObject.match) {
          chordCount++;
          resultObject.time = timer.timer(chordStartTime);
          calibrateChord(resultObject);
        } else {
          if (debug) {
            printOutput(`Time: ${timer.timer(chordStartTime)} ${file} Uncertain`);
          }
        }
      }
    });

    const foundChordEntries = Object.entries(foundChords);
    printOutput('Chords found:', chordCount);
    printOutput('Chords fixed:', foundChordEntries.length);

    foundChordEntries.forEach(([key, chord]) => {
      printOutput(chord.chordName, 'Found in', chord.time);
    });

    printOutput(`Total Time to process ${allChords.length} Chords is ${timer.timer(startTime)}`);

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
