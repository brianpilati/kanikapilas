const cv = require('opencv4nodejs');
const timer = require('../../lib/time');
const MatchLibrary = require('./lib/match-library');
const imageLibrary = require('../libs/images/image-library');
const path = require('path');
const { Image } = require('image-js');
const filePath = require('../libs/filePath');
const tesseractMatch = require('./tesseract-match');

const maxTolerance = 0.9;
const debug = false;
const displayOutput = false;

const matchLibrary = new MatchLibrary(maxTolerance, debug, displayOutput);

const startTime = new Date();

function getCapoByImage(xyCoordinates, imagePath) {
  return Image.load(imagePath).then(function(image) {
    const boundary = imageLibrary.getArtistCoordinates(image, xyCoordinates);

    const capoImage = image.crop(boundary);

    const capoImagePath = `/tmp/file-capo-${filePath.getFileGuid()}.png`;

    return capoImage.save(capoImagePath).then(function() {
      return tesseractMatch.findWords(capoImagePath, 1200).then(results => {
        return matchLibrary.parseOCRWord(results);
      });
    });
  });
}

function capoMatch(imagePath) {
  return matchLibrary.processImage(imagePath).then(function(originalMat) {
    const filePath = path.join(__dirname, 'data', 'symbols', 'capo.png');

    const capoMat = cv.imread(filePath); //.resizeToMax(50);
    const foundCapo = matchLibrary.findWaldo(originalMat, capoMat);

    matchLibrary.printOutput(`Total Time to process is ${timer.timer(startTime)}`);

    return foundCapo;
  });
}

class Capo {
  constructor() {}

  getCapoByImage(imagePath) {
    return capoMatch(imagePath).then(results => {
      if (results.match) {
        const xyCoordinates = Object({
          x: results.x,
          y: results.y
        });

        return getCapoByImage(xyCoordinates, imagePath);
      } else {
        return 'None';
      }
    });
  }
}

module.exports = new Capo();

/*
capo = new Capo();

//capo.getCapoByImage('../../../deployment_local/assets/b/billy-joel/the-longest-time.png').then(result => console.log(result));
capo.getCapoByImage('../../../deployment_local/assets/b/billy-joel/the-piano-man.png').then(result => console.log(result));
*/
