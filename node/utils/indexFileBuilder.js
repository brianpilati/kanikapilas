const fs = require('fs');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');
const artistBuilder = require('./libs/artistBuilder');
const songBuilder = require('./libs/songBuilder');

function getFilePath(index) {
  let filePath;
  if (index === 1) {
    filePath = '../../deployment/index.html';
  } else {
    filePath = `../../deployment/page/${index}/index.html`;
    FilePath.ensureDirectoryExistence(filePath);
  }

  return FilePath.encodePath(filePath);
}

artistBuilder.getArtists().then(function(artists) {
  songBuilder.getSongs().then(function(songs) {
    for (var index = 1; index < 51; index++) {
      const indexFilePath = getFilePath(index);
      htmlBuilder.buildIndexHtml(index, artists, songs).then(function(page) {
        fs.writeFile(indexFilePath, page, err => {
          if (err) {
            return console.log(err);
          }
          console.log(`The ${indexFilePath} file was saved!`);
        });
      });
    }
  });
});
