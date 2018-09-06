const indexFileBuilder = require('./builders/indexFileBuilder');
const pool = require('../lib/database');

console.log('\n\nStarting to Process Files');
indexFileBuilder.buildPages().then(indexFileBuilderResults => {
  console.log('\n\nIndexFileBulder Results\n');
  console.log(indexFileBuilderResults);
  console.log('\n\nclosing the pool\n\n');
  pool.end();
});
