const fs = require('fs');
const path = require('path');
const timer = require('../lib/time');
const artistMatch = require('./image_recognition/artist-match');
const fileResize = require('./libs/images/fileResize');
const imageFileBuilder = require('./imageFileBuilder');
const songDomain = require('../server/domains/song');
const pool = require('../lib/database');

const debug = true;
const testSong = 'Book_2_1-19.png';
//const testSong = 'Book_2_1-20.png';
//const testSong = 'Book_2_1-21.png';
//const testSong = 'Book_2_1-22.png';
//const testSong = 'Book_2_1-23.png';
//const testSong = 'Book_2_1-24.png';

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
  const imageFolder = './pdf/pdf-files/books';
  const files = fs.readdirSync(imageFolder);

  const requests = files.map(file => {
    return new Promise(resolve => {
      if (file.match(/^Book_\d_\d-\d+.png/)) {
        if (parseSong(file)) {
          const songStart = new Date();
          console.log('\n\n', `Started to parse file: ${file}`);

          let filePath = path.join(imageFolder, file);
          artistMatch.artistsMatch(filePath, 0.85).then(artistsMatched => {
            if (artistsMatched) {
              if (artistsMatched > 1) {
                moveSong(filePath, file);
              } else {
                fileResize.processImage(filePath).then(results => {
                  songDomain.replaceSong(results).then(song => {
                    imageFileBuilder.processImage(song, filePath, true).then(results => {
                      console.log(`\nParse ${file} Song Time: ${timer.timer(songStart)}.`);
                      console.log(`Artist: ${results.artist}. Title: ${results.title}`);
                      resolve(results);
                    });
                  });
                });
              }
            } else {
              if (debug) {
                console.log(
                  `Parse ${file} Song Time: ${timer.timer(songStart)}. Artists Not Matched: ${artistsMatched}`
                );
              }
            }
          });
        } else {
          resolve('not found');
        }
      } else {
        resolve('not found');
      }
    });
  });

  return Promise.all(requests);
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

findSongs().then(() => {
  pool.end();
  console.log('\n\nending the pool\n\n');
});

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
