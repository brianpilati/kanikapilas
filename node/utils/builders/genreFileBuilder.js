const options = require('../../lib/options');
const fs = require('fs');
const htmlBuilder = require('../libs/htmlBuilder');
const FilePath = require('../libs/filePath');
const genreBuilder = require('../libs/genreBuilder');
const pool = require('../../lib/database');

function getFilePath(genre) {
  let filePath = `../../../deployment/genres/${genre}/index.html`;
  FilePath.ensureDirectoryExistence(filePath);
  return FilePath.encodePath(filePath);
}

function buildPages() {
  const requests = genreBuilder.getGenreList().map(genre => {
    return new Promise(resolve => {
      const genreFilePath = getFilePath(genre);

      htmlBuilder.buildGenreHtml(genre).then(function(genreHtml) {
        fs.writeFile(genreFilePath, genreHtml, err => {
          if (err) {
            return console.log(err);
          }

          resolve(`The ${genreFilePath} file was saved!`);
        });
      });
    });
  });

  return Promise.all(requests);
}

class GenreFileBuilder {
  buildPages() {
    return buildPages();
  }
}

module.exports = new GenreFileBuilder();

if (options.isCommandLine()) {
  const genreFileBuilder = new GenreFileBuilder();

  genreFileBuilder.buildPages().then(function(results) {
    console.log(results);
    pool.end();
    console.log('closing the pool');
  });
}
