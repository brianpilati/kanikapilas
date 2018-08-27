const songDomain = require('../../server/domains/song');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const FilePath = require('./filePath');

module.exports = {
  async getSongsByArtist(artist) {
    return await songDomain.getSongsByArtist(artist).then(function(results) {
      let songs = '';
      results.forEach(function(song) {
        const link = FilePath.getRelativeFileUrl(song);

        songs += `<div class="artist"><a href="/${link}">${titleBuilder.title(song.title, sizes.small)}</a></div>`;
      });

      return songs;
    });
  },

  async getSongsByLetter(letter) {
    return await songDomain.getSongsByLetter(letter).then(function(results) {
      let songs = '';
      results.forEach(function(song) {
        const link = FilePath.getRelativeFileUrl(song);

        songs += `<div class="artist"><a href="/${link}">${titleBuilder.title(song.title, sizes.small)}</a></div>`;
      });

      return songs;
    });
  },

  async getSongsByRecommendation() {
    return await songDomain.getSongs();
  },

  getSongs() {
    const songList = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ].sort();

    let songs = '';
    songList.forEach(function(song) {
      const link = FilePath.encodePath(`/songs/${song}/index.html`);
      songs += `<div class="artist"><a href="${link}">${song}</a></div>`;
    });

    return songs;
  }
};
