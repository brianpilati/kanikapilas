var fs = require('fs');
const pool = require('../lib/database');
const HtmlBuilder = require('./libs/htmlBuilder');
const htmlBuilder = new HtmlBuilder(pool);
const FilePath = require('./libs/filePath');

function getFilePath(index) {
  if (index === 1) {
    return '../../deployment/index.html';
  } else {
    const filePath = `../../deployment/page/${index}/index.html`;
    FilePath.ensureDirectoryExistence(filePath);
    return filePath;
  }
}

let poolCounter = 1;

for (var index = 1; index < 51; index++) {
  const indexFilePath = getFilePath(index);
  fs.writeFile(indexFilePath, htmlBuilder.buildIndexHtml(index), err => {
    if (err) {
      return console.log(err);
    }
    poolCounter++;
    if (poolCounter === 51) {
      pool.end();
    }
    console.log(`The ${indexFilePath} file was saved!`);
  });
}
