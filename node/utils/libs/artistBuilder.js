const artistDomain = require('../../server/domains/artist');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const FilePath = require('../libs/filePath');

module.exports = {
  async getArtistsByLetter(letter) {
    return await artistDomain.getArtistsByLetter(letter).then(function(songs) {
      let artists = '';
      songs.forEach(function(song) {
        const link = FilePath.encodePath(`/${letter}/${song.artist}/index.html`);

        artists += `<div class="artist"><a href="${link}">${titleBuilder.title(song.artist, sizes.small)}</a></div>`;
      });

      return artists;
    });
  },

  getArtists() {
    const artistList = [
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

    let artists = '';
    artistList.forEach(function(artist) {
      const link = FilePath.encodePath(`/${artist}/index.html`);
      artists += `<div class="artist"><a href="${link}">${artist}</a></div>`;
    });

    return artists;
  }
};
