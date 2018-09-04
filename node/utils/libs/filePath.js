var path = require('path');
var fs = require('fs');

function encodePath(path) {
  return typeof path === 'string' ? path.replace(/\s+|'/g, '-').toLowerCase() : '';
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

function buildLetterPath(artist) {
  return encodePath(getArtistFirstLetter(artist));
}

function buildArtistPath(artist) {
  return encodePath(path.join(buildLetterPath(artist), buildFileName(artist)));
}

function buildDirectoryPath(song) {
  return encodePath(path.join(buildArtistPath(song.artist), buildFileName(song.title)));
}

function buildFilePath(song) {
  return path.join('songs', buildDirectoryPath(song), 'index.html');
}

function buildImagePath(song, location) {
  if (location) {
    return encodePath(path.join('assets', `${buildDirectoryPath(song)}_${location}.png`));
  } else {
    return encodePath(path.join('assets', `${buildDirectoryPath(song)}.png`));
  }
}

function getSourceImagePath(song) {
  return path.join('..', '..', 'deployment_local', buildImagePath(song));
}

function getSourceImageHeaderPath(song) {
  const songPath = getSourceImagePath(song);
  const ext = path.extname(songPath);
  const fileName = path.basename(songPath, ext);
  const filePath = path.dirname(songPath);
  return encodePath(path.join(filePath, `${fileName}-header${ext}`));
}

function getSourceImageFooterPath(song) {
  const songPath = getSourceImagePath(song);
  const ext = path.extname(songPath);
  const fileName = path.basename(songPath, ext);
  const filePath = path.dirname(songPath);
  return encodePath(path.join(filePath, `${fileName}-footer${ext}`));
}

module.exports = {
  getFileName: function(name) {
    return buildFileName(name);
  },
  getFilePath: function(song) {
    return path.join('..', '..', 'deployment', buildFilePath(song));
  },
  getUrlPath: function(song) {
    return `http://kanikapilas.com/${buildFilePath(song)}`;
  },
  getSourceImagePath: function(song) {
    return getSourceImagePath(song);
  },
  getUnprocessedImagePath: function(fileName) {
    return encodePath(path.join('..', '..', 'deployment_local', 'unprocessed', fileName));
  },
  getDestinationImagePath: function(song, location) {
    const imageFilePath = path.join('..', '..', 'deployment', buildImagePath(song, location));
    ensureDirectoryExistence(imageFilePath);
    return imageFilePath;
  },
  getImageUrlPath: function(song) {
    return `http://kanikapilas.com/${buildImagePath(song)}`;
  },
  getRelativeImageUrlPath: function(song, location) {
    return buildImagePath(song, location);
  },
  getRelativeFileUrl: function(song) {
    return encodePath(buildFilePath(song));
  },
  buildFilePath: function(song) {
    const filePath = this.getFilePath(song);
    ensureDirectoryExistence(filePath);
    return filePath;
  },
  ensureDirectoryExistence(filePath) {
    ensureDirectoryExistence(filePath);
  },
  getArtistUrl(artist) {
    return path.join('/', 'artists', buildArtistPath(artist));
  },
  getLetterUrl(artist) {
    return buildLetterPath(artist);
  },
  getGenreUrl(genre) {
    return encodePath(path.join('/', 'genres', genre, 'index.html'));
  },
  encodePath(path) {
    return encodePath(path);
  },
  getImageHeaderPath(song) {
    return getSourceImageHeaderPath(song);
  },
  getImageFooterPath(song) {
    return getSourceImageFooterPath(song);
  },
  getFileGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
};
