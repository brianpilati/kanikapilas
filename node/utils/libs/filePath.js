var path = require('path');
var fs = require('fs');

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

function buildFileName(name) {
  return name.replace(/\s+/g, '-').toLowerCase();
}

function buildDirectoryPath(song) {
  return `${getArtistFirstLetter(song.artist)}/${buildFileName(song.artist)}/${buildFileName(song.title)}`;
}

function buildFilePath(song) {
  return `${buildDirectoryPath(song)}/index.html`;
}

function buildImagePath(song) {
  return `${buildDirectoryPath(song)}.png`;
}

module.exports = {
  getFileName: function(name) {
    return buildFileName(name);
  },
  getFilePath: function(song) {
    return `../../deployment/${buildFilePath(song)}`;
  },
  getUrlPath: function(song) {
    return `http://kanikapilas.com/${buildFilePath(song)}`;
  },
  getSourceImagePath: function(song) {
    return `../../src/assets/${buildImagePath(song)}`;
  },
  getDestinationImagePath: function(song) {
    const imageFilePath = `../../deployment/assets/${buildImagePath(song)}`;
    ensureDirectoryExistence(imageFilePath);
    return imageFilePath;
  },
  getImageUrlPath: function(song) {
    return `http://kanikapilas.com/${buildImagePath(song)}`;
  },
  buildFilePath: function(song) {
    const filePath = this.getFilePath(song);
    ensureDirectoryExistence(filePath);
    return filePath;
  }
};
