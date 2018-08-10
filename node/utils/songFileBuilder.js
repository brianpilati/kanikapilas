var fs = require('fs');
var path = require('path');
var pool = require('../lib/database');
var waterMark = require('./waterMark');
var htmlBuilder = require('./htmlBuilder');
var SongDomain = require('../server/domains/song');
const songDomain = new SongDomain(pool);

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function getArtistFirstLetter(artist) {
  return artist.charAt(0).toLowerCase();
}

function getFileName(name) {
  return name.replace(/\s+/g, '-').toLowerCase();
}

function getFilePath(song) {
  const filePath = `../../deployment/${getArtistFirstLetter(song.artist)}/${getFileName(song.artist)}/${getFileName(
    song.title
  )}.html`;
  ensureDirectoryExistence(filePath);
  return filePath;
}

songDomain.getSongs().then(result => {
  result.forEach(song => {
    const songFileName = getFileName(song.title);
    fs.writeFile(getFilePath(song), htmlBuilder.buildHtml(song), err => {
      if (err) {
        return console.log(err);
      }
      console.log(`The ${songFileName} file was saved!`);
    });

    waterMark.addWaterMark(song.imageName);
  });
  pool.end();
});
