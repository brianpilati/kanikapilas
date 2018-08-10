var fs = require('fs');
var pool = require('../lib/database');
var waterMark = require('./libs/waterMark');
var htmlBuilder = require('./libs/htmlBuilder');
const filePath = require('./libs/filePath');
var SongDomain = require('../server/domains/song');
const songDomain = new SongDomain(pool);

songDomain.getSongs().then(result => {
  result.forEach(song => {
    const songFileName = filePath.getFileName(song.title);
    fs.writeFile(filePath.buildFilePath(song), htmlBuilder.buildHtml(song), err => {
      if (err) {
        return console.log(err);
      }
      console.log(`The ${songFileName} file was saved!`);
    });

    waterMark.addWaterMark(song);
  });
  pool.end();
});
