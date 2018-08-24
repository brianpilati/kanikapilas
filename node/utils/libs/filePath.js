var path = require('path');
var fs = require('fs');

function encodePath(path) {
  return path.replace(/\s+/g, '-').toLowerCase();
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(encodePath(filePath));
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

function buildImagePath(song, location) {
  if (location) {
    return `assets/${buildDirectoryPath(song)}_${location}.png`;
  } else {
    return `assets/${buildDirectoryPath(song)}.png`;
  }
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
    return `../../src/${buildImagePath(song)}`;
  },
  getDestinationImagePath: function(song, location) {
    const imageFilePath = `../../deployment/${buildImagePath(song, location)}`;
    ensureDirectoryExistence(imageFilePath);
    return imageFilePath;
  },
  getImageUrlPath: function(song) {
    return `http://kanikapilas.com/${buildImagePath(song)}`;
  },
  getRelativeImageUrlPath: function(song, location) {
    return `/${buildImagePath(song, location)}`;
  },
  buildFilePath: function(song) {
    const filePath = this.getFilePath(song);
    ensureDirectoryExistence(filePath);
    return filePath;
  },
  ensureDirectoryExistence(filePath) {
    ensureDirectoryExistence(filePath);
  },
  encodePath(path) {
    return encodePath(path);
  }
};
