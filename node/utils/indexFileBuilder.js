var fs = require('fs');
var HtmlBuilder = require('./libs/htmlBuilder');
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

for (var index = 1; index < 51; index++) {
  const indexFilePath = getFilePath(index);
  fs.writeFile(indexFilePath, HtmlBuilder.buildIndexHtml(index), err => {
    if (err) {
      return console.log(err);
    }
    console.log(`The ${indexFilePath} file was saved!`);
  });
}
