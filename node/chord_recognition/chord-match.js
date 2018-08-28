const cv = require('opencv4nodejs');

const debug = false;

const bestNMatches = 40;
//const tolerance = 0.003;
const tolerance = 0.1;

const matchFeatures = ({ chordImage, songDescriptors, detector, matchFunc, song, songKeyPoints }) => {
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
      return match.distance < tolerance;
    })
    .slice(0, bestNMatches);

  if (debug) {
    cv.imshow(
      'ORB matches',
      cv.drawMatches(chordImage, song, chordKeyPoints, songKeyPoints, bestMatches).resize(400, 500)
    );
    cv.waitKey();
  }

  if (debug) {
    console.log(bestMatches.length);
  }
  //return bestMatches.length === 40;
  return bestMatches.length >= 8;
};

//let song = cv.imread('./data/Africa.png');
//let song = cv.imread('./data/Africa_just_chords.png');
//let song = cv.imread('./data/Blue_Savannah.png');
//let song = cv.imread('../../deployment/assets/c/cindy-lauper/manic-monday_1.png').rotate(cv.ROTATE_180);
let song = cv.imread('../../src/assets/t/toto/africa.png').resizeToMax(2070);
//let song = cv.imread('../../src/assets/c/cindy-lauper/manic-monday.png').resizeToMax(2070);

//song = song.rotate(cv.ROTATE_180);

//cv.imshowWait('ORB matches', song);

const start = new Date();

const detector = new cv.SURFDetector();
const songKeyPoints = detector.detect(song);
const songDescriptors = detector.compute(song, songKeyPoints);

console.log('Time: ', new Date() - start);

const chords = [
  'a-chord',
  'bb-chord',
  'bm-chord',
  'b7-chord',
  'c-chord',
  'd-chord',
  'dm-chord',
  'em-chord',
  'e7-chord',
  'g-chord',
  'gm-chord'
];

chords.forEach(function(chord) {
  const start = new Date();

  let chordImage = cv.imread(`./data/chords/${chord}.png`).resizeToMax(92);
  let found = matchFeatures({
    chordImage,
    songDescriptors,
    detector: detector,
    matchFunc: cv.matchBruteForce,
    song,
    songKeyPoints
  });

  if (found) {
    console.log('Time: ', new Date() - start, `${chord} Found: `, found);
  }
});

//cv.imwrite(`${__dirname}/data/${chord}_found.png`, surfMatchesImg);
//cv.imshowWait('ORB matches', surfMatchesImg.resize(400, 518));
