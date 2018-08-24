const artistDomain = require('../../server/domains/artist');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');

module.exports = {
  async getArtistsByLetter(letter) {
    return await artistDomain.getArtistsByLetter(letter).then(function(results) {
      let artists = '';
      results.forEach(function(song) {
        artists += `<div class="artist"><a href="/artists/${letter}/${song.artist}/index.html">${titleBuilder.title(
          song.artist,
          sizes.small
        )}</a></div>`;
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
      artists += `<div class="artist"><a href="/artists/${artist}/index.html">${artist}</a></div>`;
    });

    return artists;
  }
};
