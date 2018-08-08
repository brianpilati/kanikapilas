var fs = require('fs');
var pool = require('../lib/database');
var SongDomain = require('../server/domains/song');
const songDomain = new SongDomain(pool);

songDomain.getSongs().then(result => {
  result.forEach(song => {
    console.log(2, song.title);
    fs.writeFile(`../../deployment/test_${song.title}.html`, song.title, err => {
      console.log('here');
      if (err) {
        console.log(222);
        return console.log(err);
      }
      console.log(`The ${song.title} file was saved!`);
    });
  });
  pool.end();
});
