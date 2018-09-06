const fs = require('fs');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');
const alphabet = require('./libs/enums/alphabet-enums');
const pool = require('../lib/database');

var songDomain = require('../server/domains/song');

function buildSongPages() {
  return songDomain.getActiveSongs().then(songs => {
    const requests = songs.map(song => {
      return new Promise(resolve => {
        const songFileName = FilePath.buildFilePath(song);

        fs.writeFile(songFileName, htmlBuilder.buildSongHtml(song), err => {
          if (err) {
            resolve(err);
          }

          resolve(`The ${songFileName} file was saved!`);
        });
      });
    });

    return Promise.all(requests);
  });
}

function getFilePath(letter) {
  let filePath;

  filePath = `../../deployment/songs/${letter}/index.html`;
  FilePath.ensureDirectoryExistence(filePath);
  return FilePath.encodePath(filePath);
}

function buildSongByLetterPages(letter) {
  return new Promise(resolve => {
    const songFilePath = getFilePath(letter);

    htmlBuilder.buildSongsHtml(letter).then(function(songHtml) {
      fs.writeFile(songFilePath, songHtml, err => {
        if (err) {
          return console.log(err);
        }

        resolve(`The ${songFilePath} file was saved!`);
      });
    });
  });
}

function buildAllPages() {
  const songRequests = buildSongPages();

  const songLetterRequests = alphabet.map(letter => {
    return buildSongByLetterPages(letter);
  });

  return songRequests.then(results => {
    return Promise.all(songLetterRequests).then(_results_ => {
      return results.concat(_results_);
    });
  });
}

buildAllPages().then(function(results) {
  console.log(results);
  pool.end();
  console.log('closing the pool');
});
