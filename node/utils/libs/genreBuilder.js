const genreList = require('./enums/genre-enums');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
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
        genres += `<div class="artist"><a href="/${FilePath.getRelativeFileUrl(song)}">${titleBuilder.title(
          song.title,
          sizes.small
        )} by ${titleBuilder.title(song.artist, sizes.small)}</a></div>`;
      });

      return genres;
    });
  }
};
