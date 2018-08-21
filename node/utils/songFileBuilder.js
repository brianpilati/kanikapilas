var fs = require('fs');
var pool = require('../lib/database');
var waterMark = require('./libs/images/waterMark');
var htmlBuilder = require('./libs/htmlBuilder');
const filePath = require('./libs/filePath');
const fileResize = require('./libs/images/fileResize');

var SongDomain = require('../server/domains/song');
const songDomain = new SongDomain(pool);

songDomain.getSongs().then(result => {
  result.forEach(song => {
    const songFileName = filePath.getFileName(song.title);
    fs.writeFile(filePath.buildFilePath(song), htmlBuilder.buildSongHtml(song), err => {
      if (err) {
        return console.log(err);
      }
      console.log(`The ${songFileName} file was saved!`);
    });

    fileResize.resizeImage(song).then(function() {
      waterMark.addWaterMark(song);
    });
  });
  pool.end();
});
