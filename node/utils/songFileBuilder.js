var fs = require('fs');
var pool = require('../lib/database');
var waterMark = require('./waterMark');
var htmlBuilder = require('./htmlBuilder');
var SongDomain = require('../server/domains/song');
const songDomain = new SongDomain(pool);

function getFileName(songTitle) {
  return songTitle.replace(/\s+/g, '_').toLowerCase();
}

songDomain.getSongs().then(result => {
  result.forEach(song => {
    const songFileName = getFileName(song.title);
    fs.writeFile(`../../deployment/${songFileName}.html`, htmlBuilder.buildHtml(song), err => {
      if (err) {
        return console.log(err);
      }
      console.log(`The ${songFileName} file was saved!`);
    });

    waterMark.addWaterMark(song.imageName);
  });
  pool.end();
});
