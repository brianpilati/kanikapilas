const cv = require('opencv4nodejs');
const fs = require('fs');
const path = require('path');
const { Image } = require('image-js');

const debug = false;

const bestNMatches = 40;
const distanceTolerance = 0.27;
const minTolerance = 0.1;
const successNumber = 6;

const matchFeatures = ({ starImage, songDescriptors, detector, matchFunc, song, songKeyPoints }) => {
  const returnObject = {
    found: false,
    noMatches: false,
    distance: false
  };

  // detect keypoints
  const chordKeyPoints = detector.detect(starImage);

  // compute feature descriptors
  const chordDescriptors = detector.compute(starImage, chordKeyPoints);

  // match the feature descriptors
  let matches = [];
  try {
    matches = matchFunc(chordDescriptors, songDescriptors);
  } catch (error) {
    returnObject.noMatches = true;
    return returnObject;
  }

  // only keep good matches
  const bestMatches = matches
    .sort((match1, match2) => match1.distance - match2.distance)
    .filter(match => {
      if (debug) {
        console.log(match.distance, match.trainIdx);
      }
      return match.distance < distanceTolerance;
    })
    .slice(0, bestNMatches);

  if (bestMatches.length) {
    if (bestMatches[bestMatches.length - 1].distance - bestMatches[0].distance < minTolerance) {
      console.log('too distance', bestMatches[bestMatches.length - 1].distance - bestMatches[0].distance, minTolerance);
      returnObject.distance = true;
      return returnObject;
    }
  } else {
    returnObject.noMatches = true;
    return returnObject;
  }

  if (debug) {
    cv.imshow(
      'ORB matches',
      cv.drawMatches(starImage, song, chordKeyPoints, songKeyPoints, bestMatches).resize(100, 469)
    );
    cv.waitKey();
  }

  if (debug) {
    console.log(bestMatches.length);
  }
  returnObject.found = bestMatches.length >= successNumber;
  return returnObject;
};

function processImage(songImage, starImage, $index) {
  try {
    return Image.load(songImage).then(function(image) {
      const croppedImage = image.crop({
        x: 200,
        width: 400,
        height: 80
      });

      const savedImage = `/tmp/song_cropped_${$index}.png`;
      return croppedImage.save(savedImage).then(function() {
        let song = cv
          .imread(savedImage)
          .bgrToGray()
          .resizeToMax(3000);
        const start = new Date();

        const detector = new cv.SURFDetector();
        const songKeyPoints = detector.detect(song);
        const songDescriptors = detector.compute(song, songKeyPoints);

        console.log('Time: ', new Date() - start);

        let foundObject = matchFeatures({
          starImage,
          songDescriptors,
          detector: detector,
          matchFunc: cv.matchBruteForce,
          song,
          songKeyPoints
        });

        if (foundObject.found) {
          console.log('Time: ', new Date() - start, `${songImage} Found: `, foundObject.found);
        } else {
          console.log('Time: ', new Date() - start, `${songImage} NOT Found: `, foundObject.found);
        }

        return foundObject;
      });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}

function main() {
  const imageFolder = '../pdf/pdf-files/';
  let starImage = cv.imread(`./data/symbols/star.png`).resizeToMax(120);
  let file = 'Book_2_3-1.png';
  let $index = 1;

  fs.readdirSync(imageFolder).forEach((file, $index) => {
    if (file.match(/^Book_\d_\d-\d+.png/)) {
      let filePath = path.join(imageFolder, file);
      processImage(filePath, starImage, $index).then(function(foundObject) {
        if (foundObject.found) {
          let dstFilePath = path.join('../../src/assets/unprocessed', file);
          fs.rename(filePath, dstFilePath, function() {
            console.log(file, ' moved');
          });
        } else if (foundObject.distance) {
          console.log(file, ' uncertain distance');
        } else if (foundObject.noMatches) {
          fs.unlink(filePath, function() {
            console.log(file, ' with no matches removed');
          });
        } else {
          console.log(file, ' uncertain');
        }
      });
    }
  });
}

main();
