const waterMark = require('./libs/images/waterMark');
const fileResize = require('./libs/images/fileResize');
const pool = require('../lib/database');

var songDomain = require('../server/domains/song');

function buildImages() {
  return songDomain.getSongs().then(songs => {
    const requests = songs.map(song => {
      return new Promise(resolve => {
        fileResize.resizeImage(song).then(function(results) {
          resolve(results);
          //waterMark.addWaterMark(song);
        });
      });
    });

    return Promise.all(requests);
  });
}

buildImages().then(function(results) {
  console.log(results);
  pool.end();
  console.log('closing the pool');
});
