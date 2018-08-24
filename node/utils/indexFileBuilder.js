var fs = require('fs');
const htmlBuilder = require('./libs/htmlBuilder');
const FilePath = require('./libs/filePath');

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

for (var index = 1; index < 51; index++) {
  const indexFilePath = getFilePath(index);
  fs.writeFile(indexFilePath, htmlBuilder.buildIndexHtml(index), err => {
    if (err) {
      return console.log(err);
    }
    console.log(`The ${indexFilePath} file was saved!`);
  });
}
