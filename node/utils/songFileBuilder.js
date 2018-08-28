const fs = require('fs');
const waterMark = require('./libs/images/waterMark');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');
const fileResize = require('./libs/images/fileResize');
const alphabet = require('./libs/enums/alphabet-enums');

var songDomain = require('../server/domains/song');

songDomain.getSongs().then(result => {
  result.forEach(song => {
    const songFileName = FilePath.buildFilePath(song);

    fs.writeFile(songFileName, htmlBuilder.buildSongHtml(song), err => {
      if (err) {
        return console.log(err);
      }
      console.log(`The ${songFileName} file was saved!`);
    });

    fileResize.resizeImage(song).then(function() {
      waterMark.addWaterMark(song);
    });
  });
});

function getFilePath(letter) {
  let filePath;

  filePath = `../../deployment/songs/${letter}/index.html`;
  FilePath.ensureDirectoryExistence(filePath);
  return FilePath.encodePath(filePath);
}

//songDomain.getSongsFirstLetter().then(result => {
//  for (songLetter of result) {
for (songLetter of alphabet) {
  //const letter = songLetter.songFirstLetter;
  const letter = songLetter;
  const songFilePath = getFilePath(letter);

  htmlBuilder.buildSongsHtml(letter).then(function(songHtml) {
    fs.writeFile(songFilePath, songHtml, err => {
      if (err) {
        return console.log(err);
      }

      console.log(`The ${songFilePath} file was saved!`);
    });
  });
}
//});
