var fs = require('fs');
var htmlBuilder = require('./libs/htmlBuilder');

const indexFilePath = '../../deployment/index.html';
fs.writeFile(indexFilePath, htmlBuilder.buildIndexHtml(), err => {
  if (err) {
    return console.log(err);
  }
  console.log(`The ${indexFilePath} file was saved!`);
});
