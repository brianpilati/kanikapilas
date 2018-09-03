const cv = require('opencv4nodejs');
const fs = require('fs');
const path = require('path');
const timer = require('../lib/time');
const MatchLibrary = require('./lib/match-library');

const maxTolerance = 0.6;
const debug = false;
const displayOutput = false;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

const testFirstNote = 'f-sharp.png';
//const testFirstNote = 'c.png';

function parseFirstNote(firstNote) {
  if (firstNote === '.DS_Store') {
    return false;
  }
  return debug ? firstNote === testFirstNote : true;
}

const startTime = new Date();

function firstNoteMatch(songPath) {
  let firstNoteFound = 'none';
  const processImageOptions = Object({
    resizeToMax: true,
    resizeToMaxValue: 1500
  });

  return matchLibrary.processImage(songPath, processImageOptions).then(function(originalMat) {
    const pdfFolder = path.join(__dirname, '..', '..', 'deployment', 'assets', 'first-notes');
    let firstNoteCount = 0;
    const allFirstNotes = fs.readdirSync(pdfFolder);
    const resultObject = Object({
      firstNotes: []
    });

    allFirstNotes.forEach(file => {
      if (parseFirstNote(file)) {
        const firstNoteStartTime = new Date();

        const filePath = path.join(pdfFolder, file);

        const firstNoteMat = cv.imread(filePath).resizeToMax(100);
        const resultObject = matchLibrary.findWaldo(originalMat, firstNoteMat, file);

        if (resultObject.match) {
          firstNoteCount++;
          resultObject.time = timer.timer(firstNoteStartTime);
          matchLibrary.calibrate(resultObject);
        } else {
          if (debug) {
            matchLibrary.printOutput(`Time: ${timer.timer(firstNoteStartTime)} ${file} Uncertain`);
          }
        }
      }
    });

    const foundFirstNoteEntries = Object.entries(matchLibrary.getFoundWaldos());
    matchLibrary.printOutput('FirstNotes found:', firstNoteCount);
    matchLibrary.printOutput('FirstNotes fixed:', foundFirstNoteEntries.length);

    foundFirstNoteEntries.forEach(([key, firstNote]) => {
      firstNoteFound = firstNote.name;
      matchLibrary.printOutput(firstNote.name, 'Found in', firstNote.time);
    });

    matchLibrary.printOutput(`Total Time to process ${allFirstNotes.length} FirstNotes is ${timer.timer(startTime)}`);

    return firstNoteFound;
  });
}

module.exports = {
  firstNoteMatch(songImagePath) {
    return firstNoteMatch(songImagePath).then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

//firstNoteMatch('../../deployment_local/assets/t/the-bangles/manic-monday.png');
//firstNoteMatch( '../../deployment_local/assets/c/crowded-house/don-t-dream-it-s-over.png');
//firstNoteMatch('../../deployment_local/assets/t/toto/africa.png');
//firstNoteMatch('../../deployment_local/assets/b/belinda-carlisle/heaven-is-a-place-on-earth.png').then(firstNotes => console.log('FirstNotes Found', firstNotes));

//firstNoteMatch('../../deployment_local/assets/c/chris-deburgh/lady-in-red.png');
