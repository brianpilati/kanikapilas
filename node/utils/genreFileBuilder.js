const fs = require('fs');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');
const genreBuilder = require('./libs/genreBuilder');

var songDomain = require('../server/domains/song');

function getFilePath(genre) {
  let filePath = `../../deployment/${genre}/index.html`;
  FilePath.ensureDirectoryExistence(filePath);
  return FilePath.encodePath(filePath);
}

genreBuilder.getGenreList().forEach(genre => {
  const genreFilePath = getFilePath(genre);

  htmlBuilder.buildGenreHtml(genre).then(function(genreHtml) {
    fs.writeFile(genreFilePath, genreHtml, err => {
      if (err) {
        return console.log(err);
      }

      console.log(`The ${genreFilePath} file was saved!`);
    });
  });
});
