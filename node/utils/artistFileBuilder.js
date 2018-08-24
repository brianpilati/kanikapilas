const fs = require('fs');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');

var artistDomain = require('../server/domains/artist');

function getFilePath(letter, artist) {
  let filePath;

  if (artist) {
    filePath = `../../deployment/artists/${letter}/${artist}/index.html`;
  } else {
    filePath = `../../deployment/artists/${letter}/index.html`;
  }
  FilePath.ensureDirectoryExistence(filePath);
  return FilePath.encodePath(filePath);
}

artistDomain.getArtistFirstLetter().then(result => {
  for (artistLetter of result) {
    const letter = artistLetter.artistFirstLetter;
    const artistFilePath = getFilePath(letter);

    htmlBuilder.buildArtistHtml(letter).then(function(artistHtml) {
      fs.writeFile(artistFilePath, artistHtml, err => {
        if (err) {
          return console.log(err);
        }

        console.log(`The ${artistFilePath} file was saved!`);
      });
    });

    artistDomain.getArtistsByLetter(letter).then(result => {
      for (song of result) {
        const artistFileSongPath = getFilePath(letter, song.artist);

        htmlBuilder.buildArtistSongHtml(song.artist).then(function(artistSongHtml) {
          fs.writeFile(artistFileSongPath, artistSongHtml, err => {
            if (err) {
              return console.log(err);
            }

            console.log(`The ${artistFileSongPath} file was saved!`);
          });
        });
      }
    });
  }
});
