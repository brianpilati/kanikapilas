var fs = require('fs');
// var waterMark = require('./libs/images/waterMark');
var htmlBuilder = require('./libs/htmlBuilder');
const filePath = require('./libs/filePath');
const fileResize = require('./libs/images/fileResize');

var songDomain = require('../server/domains/song');

songDomain.getSongs().then(result => {
  result.forEach(song => {
    const songFileName = filePath.buildFilePath(song);

    fs.writeFile(songFileName, htmlBuilder.buildSongHtml(song), err => {
      if (err) {
        return console.log(err);
      }
      console.log(`The ${songFileName} file was saved!`);
    });

    fileResize.resizeImage(song).then(function() {
      //waterMark.addWaterMark(song);
    });
  });
});
