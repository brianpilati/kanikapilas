const fs = require('fs');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');
const artistBuilder = require('./libs/artistBuilder');

var artistDomain = require('../server/domains/artist');

function getFilePath(letter, artist) {
  let filePath;

  if (artist) {
    filePath = `../../deployment/${letter}/${artist}/index.html`;
  } else {
    filePath = `../../deployment/${letter}/index.html`;
  }
  FilePath.ensureDirectoryExistence(filePath);
  return FilePath.encodePath(filePath);
}

//artistDomain.getArtistFirstLetter().then(result => {
const artistLetters = artistBuilder.getArtistLetters();
//for (artistLetter of result) {
for (artistLetter of artistLetters) {
  //const letter = artistLetter.artistFirstLetter;
  const letter = artistLetter;
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
//});
