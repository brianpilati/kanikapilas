const fs = require('fs');
const path = require('path');
const timer = require('../lib/time');
const artistMatch = require('./artist-match');
const fileResize = require('../utils/libs/images/fileResize');

const debug = true;
const testSong = 'Book_2_1-21.png';

function parseSong(song) {
  return debug ? song === testSong : true;
}

function moveSong(sourceFilePath, fileName) {
  let dstFilePath = path.join('..', '..', 'deployment_local', 'unprocessed', fileName);
  fs.rename(sourceFilePath, dstFilePath, function() {
    console.log(fileName, ' moved');
  });
}

function findSongs() {
  const imageFolder = '../pdf/pdf-files/books';

  fs.readdirSync(imageFolder).forEach(file => {
    if (file.match(/^Book_\d_\d-\d+.png/)) {
      if (parseSong(file)) {
        const songStart = new Date();

        let filePath = path.join(imageFolder, file);
        artistMatch.artistsMatch(filePath, 0.85).then(artistsMatched => {
          if (artistsMatched) {
            console.log(`Parse ${file} Song Time: ${timer.timer(songStart)}. Artists Matched: ${artistsMatched}`);
            if (artistsMatched > 1) {
              moveSong(filePath, file);
            } else {
              fileResize.processImage(filePath);
            }
          } else {
            if (debug) {
              console.log(`Parse ${file} Song Time: ${timer.timer(songStart)}. Artists Not Matched: ${artistsMatched}`);
            }
          }
        });
      }
    }
  });
}

module.exports = {
  findSongs() {
    return findSongs().then(
      result => {
        return result;
      },
      error => {
        return error;
      }
    );
  }
};

findSongs();

/*
function main() {
  -  const imageFolder = '../pdf/pdf-files/';
  -  let starImage = cv.imread(`./data/symbols/star.png`).resizeToMax(120);
  -  let file = 'Book_2_3-1.png';
  -  let $index = 1;
  -
  -  fs.readdirSync(imageFolder).forEach((file, $index) => {
  -    if (file.match(/^Book_\d_\d-\d+.png/)) {
  -      let filePath = path.join(imageFolder, file);
  -      processImage(filePath, starImage, $index).then(function(foundObject) {
  -        if (foundObject.found) {
  -          let dstFilePath = path.join('../../deployment_local/unprocessed', file);
  -          fs.rename(filePath, dstFilePath, function() {
  -            console.log(file, ' moved');
  -          });
  -        } else if (foundObject.distance) {
  -          console.log(file, ' uncertain distance');
  -        } else if (foundObject.noMatches) {
  -          fs.unlink(filePath, function() {
  -            console.log(file, ' with no matches removed');
  -          });
  -        } else {
  -          console.log(file, ' uncertain');
  -        }
  -      });
  -    }
  -  });
  -}
  */
