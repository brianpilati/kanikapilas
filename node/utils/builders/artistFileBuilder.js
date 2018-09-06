const options = require('../../lib/options');
const fs = require('fs');
const htmlBuilder = require('../libs/htmlBuilder');
const FilePath = require('../libs/filePath');
const alphabet = require('../libs/enums/alphabet-enums');
const pool = require('../../lib/database');

var artistDomain = require('../../server/domains/artist');

function getFilePath(letter, artist) {
  let filePath;

  if (artist) {
    filePath = `../../../deployment/artists/${letter}/${artist}/index.html`;
  } else {
    filePath = `../../../deployment/artists/${letter}/index.html`;
  }
  FilePath.ensureDirectoryExistence(filePath);
  return FilePath.encodePath(filePath);
}

function buildArtistPages(letter) {
  return new Promise(resolve => {
    const artistFilePath = getFilePath(letter);
    htmlBuilder.buildArtistHtml(letter).then(function(artistHtml) {
      fs.writeFile(artistFilePath, artistHtml, err => {
        if (err) {
          return console.log(err);
        }

        resolve(`The ${artistFilePath} file was saved!`);
      });
    });
  });
}

function buildArtistByLetterPages(letter) {
  return artistDomain.getActiveArtistsByLetter(letter).then(songs => {
    const requests = songs.map(song => {
      return new Promise(resolve => {
        const artistFileSongPath = getFilePath(letter, song.artist);

        htmlBuilder.buildArtistSongHtml(song.artist).then(function(artistSongHtml) {
          fs.writeFile(artistFileSongPath, artistSongHtml, err => {
            if (err) {
              return console.log(err);
            }

            resolve(`The ${artistFileSongPath} file was saved!`);
          });
        });
      });
    });
    return Promise.all(requests);
  });
}

class ArtistFileBuilder {
  buildAllPages() {
    const artistRequests = alphabet.map(letter => {
      return buildArtistPages(letter);
    });

    const artistLetterRequests = alphabet.map(letter => {
      return buildArtistByLetterPages(letter);
    });

    return Promise.all(artistRequests).then(results => {
      return Promise.all(artistLetterRequests).then(_results_ => {
        return results.concat(_results_);
      });
    });
  }
}

module.exports = new ArtistFileBuilder();

if (options.isCommandLine()) {
  const artistFileBuilder = new ArtistFileBuilder();

  artistFileBuilder.buildAllPages().then(function(results) {
    console.log(results);
    pool.end();
    console.log('closing the pool');
  });
}
