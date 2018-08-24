const fs = require('fs');
const pool = require('../lib/database');
const HtmlBuilder = require('./libs/htmlBuilder');
const htmlBuilder = new HtmlBuilder(pool);
const FilePath = require('./libs/filePath');

var ArtistDomain = require('../server/domains/artist');
const artistDomain = new ArtistDomain(pool);

function getFilePath(letter) {
  const filePath = `../../deployment/artists/${letter}/index.html`;
  FilePath.ensureDirectoryExistence(filePath);
  return filePath;
}

artistDomain.getArtistFirstLetter().then(result => {
  result.forEach(artistLetter => {
    const letter = artistLetter.artistFirstLetter;
    const artistFilePath = getFilePath(letter);
    fs.writeFile(artistFilePath, htmlBuilder.buildArtistHtml(letter), err => {
      if (err) {
        return console.log(err);
      }
      console.log(`The ${artistFilePath} file was saved!`);
    });
  });
  pool.end();
});
