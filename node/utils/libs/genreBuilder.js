const genreList = require('./enums/genre-enums');
const songDomain = require('../../server/domains/song');
const FilePath = require('./filePath');

module.exports = {
  getGenreList() {
    return genreList;
  },

  getGenres() {
    let genres = '';
    genreList.forEach(function(genre) {
      genres += `<a href="${FilePath.getGenreUrl(genre)}"><div class="genre">${genre}</div></a>`;
    });

    return genres;
  },

  async getActiveSongsByGenre(genre) {
    return await songDomain.getActiveSongsByGenre(genre).then(function(songs) {
      let genres = '';
      songs.forEach(function(song) {
        genres += `<a href="/${FilePath.getRelativeFileUrl(song)}"><div class="artist">${song.title}</div></a>`;
      });

      return genres;
    });
  }
};
