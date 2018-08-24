const fs = require('fs');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');

var artistDomain = require('../server/domains/artist');

function getFilePath(letter) {
  const filePath = `../../deployment/artists/${letter}/index.html`;
  FilePath.ensureDirectoryExistence(filePath);
  return filePath;
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
  }
});
