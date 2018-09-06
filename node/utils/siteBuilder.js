const pool = require('../lib/database');
const indexFileBuilder = require('./builders/indexFileBuilder');
const artistFileBuilder = require('./builders/artistFileBuilder');
const genreFileBuilder = require('./builders/genreFileBuilder');

function closeThePool() {
  console.log('\n\nclosing the pool\n\n');
  pool.end();
}

function outputResults(message, results) {
  console.log(`\n\n${message} Results\n`);
  console.log(results);
}

console.log('\n\nStarting to Process Files');
indexFileBuilder.buildPages().then(indexFileBuilderResults => {
  outputResults('IndexFileBulder', indexFileBuilderResults);
  artistFileBuilder.buildAllPages().then(artistFileBuilderResults => {
    outputResults('ArtistFileBulder', artistFileBuilderResults);
    genreFileBuilder.buildPages().then(genreFileBuilderResults => {
      outputResults('GenreFileBulder', genreFileBuilderResults);
      closeThePool();
    });
  });
});
