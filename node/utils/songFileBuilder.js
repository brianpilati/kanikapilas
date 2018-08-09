var fs = require('fs');
var pool = require('../lib/database');
var waterMark = require('./waterMark');
var SongDomain = require('../server/domains/song');
const songDomain = new SongDomain(pool);

songDomain.getSongs().then(result => {
  result.forEach(song => {
    fs.writeFile(`../../deployment/test_${song.title}.html`, song.title, err => {
      if (err) {
        return console.log(err);
      }

      waterMark.addWaterMark(song.imageName);

      console.log(`The ${song.title} file was saved!`);
    });
  });
  pool.end();
});
