var fs = require('fs');
var waterMark = require('./libs/images/waterMark');
var htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');
const fileResize = require('./libs/images/fileResize');

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

songDomain.getSongsFirstLetter().then(result => {
  for (songLetter of result) {
    const letter = songLetter.songFirstLetter;
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
});
