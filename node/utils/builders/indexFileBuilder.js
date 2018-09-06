const options = require('../../lib/options');
const fs = require('fs');
const htmlBuilder = require('../libs/htmlBuilder');
const FilePath = require('../libs/filePath');
const artistBuilder = require('../libs/artistBuilder');
const songBuilder = require('../libs/songBuilder');
const pool = require('../../lib/database');

const pagesToBuild = 50;

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
const pages = Array.apply(null, { length: pagesToBuild }).map(Number.call, Number);

function buildPages() {
  return artistBuilder.getActiveArtists().then(function(artists) {
    return songBuilder.getActiveSongs().then(function(songs) {
      const requests = pages.map(index => {
        index++;
        const indexFilePath = getFilePath(index);
        return new Promise(resolve => {
          htmlBuilder.buildIndexHtml(index, artists, songs).then(function(page) {
            fs.writeFile(indexFilePath, page, err => {
              if (err) {
                return console.log(err);
              }
              resolve(`The ${indexFilePath} file was saved!`);
            });
          });
        });
      });

      return Promise.all(requests);
    });
  });
}

class IndexFileBuilder {
  buildPages() {
    return buildPages();
  }
}

module.exports = new IndexFileBuilder();

if (options.isCommandLine()) {
  indexFileBuilder = new IndexFileBuilder();
  indexFileBuilder.buildPages().then(function(results) {
    console.log(results);
    pool.end();
    console.log('closing the pool');
  });
}
