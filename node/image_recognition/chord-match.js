const cv = require('opencv4nodejs');
const { Image } = require('image-js');
const fs = require('fs');
const path = require('path');

const debug = true;
const detector = new cv.SURFDetector();
const foundMatches = 5;
const bestNMatches = 40;
const minTolerance = 0.11;
const maxTolerance = 0.15;
const matchFunc = cv.matchBruteForce;

const matchFeatures = ({ chordImage, songDescriptors, song, songKeyPoints }) => {
  // detect keypoints
  const chordKeyPoints = detector.detect(chordImage);

  // compute feature descriptors
  const chordDescriptors = detector.compute(chordImage, chordKeyPoints);

  // match the feature descriptors
  const matches = matchFunc(chordDescriptors, songDescriptors);

  // only keep good matches
  const bestMatches = matches
    .sort((match1, match2) => match1.distance - match2.distance)
    .filter(match => {
      if (debug) {
        console.log(match.distance, match.trainIdx);
      }
      return minTolerance < match.distance && match.distance < maxTolerance;
    })
    .slice(0, bestNMatches);

  if (debug) {
    cv.imshow('ORB matches', cv.drawMatches(chordImage, song, chordKeyPoints, songKeyPoints, bestMatches));
    cv.waitKey();
  }

  if (debug) {
    console.log(bestMatches.length);
  }
  //return bestMatches.length === 40;
  return bestMatches.length >= foundMatches;
};

function processImage(songImage) {
  try {
    const start = new Date();

    return Image.load(songImage).then(function(image) {
      const croppedImage = image.crop({
        x: 100,
        width: 600,
        height: 53
      });

      const savedImagePath = `/tmp/song_cropped.png`;
      return croppedImage.save(savedImagePath).then(function() {
        let song = cv
          .imread(savedImagePath)
          .rotate(cv.ROTATE_180)
          .resizeToMax(1250);

        if (debug) {
          cv.imshowWait('ORB matches', song);
        }

        const songKeyPoints = detector.detect(song);
        const songDescriptors = detector.compute(song, songKeyPoints);

        console.log('Parse Song Time: ', new Date() - start, savedImagePath);

        return Object({
          song: song,
          keyPoints: songKeyPoints,
          descriptors: songDescriptors
        });
      });
    });
  } catch (error) {
    console.log('Error: ', error);
  }
}

processImage('../../deployment/assets/t/the-bangles/manic-monday_1.png').then(function(results) {
  const pdfFolder = './data/chords';

  fs.readdirSync(pdfFolder).forEach(file => {
    if (file === 'd.png') {
      const filePath = path.join('data', 'chords', file);
      const start = new Date();

      let chordImage = cv.imread(filePath).resizeToMax(100);
      let found = matchFeatures({
        chordImage,
        songDescriptors: results.descriptors,
        song: results.song,
        songKeyPoints: results.keyPoints
      });

      if (found) {
        console.log('Time: ', new Date() - start, `${file} Found: `, found);
      }
    }
  });
});
