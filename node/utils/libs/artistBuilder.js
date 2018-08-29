const artistDomain = require('../../server/domains/artist');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const FilePath = require('../libs/filePath');
const alphabet = require('../libs/enums/alphabet-enums');

module.exports = {
  async getArtistsByLetter(letter) {
    const artistObject = Object({
      artists: '',
      count: 0
    });

    return await artistDomain.getArtistsByLetter(letter).then(function(artists) {
      artists.forEach(function(song) {
        const link = FilePath.getArtistUrl(song.artist);

        artistObject.artists += `<div class="artist"><a href="${link}">${titleBuilder.title(
          song.artist,
          sizes.small
        )}</a></div>`;
      });

      artistObject.count = artists.length;
      return artistObject;
    });
  },

  getArtists() {
    let requests = alphabet.map(letter => {
      return new Promise(resolve => {
        artistDomain.getArtistsCountByLetter(letter).then(function(result) {
          const artistTotal = result.length ? result[0].artist_total : 0;

          let countFontClass = 'count-large';

          if (artistTotal > 99) {
            countFontClass = 'count-small';
          } else if (artistTotal > 10) {
            countFontClass = 'count-medium';
          }

          const link = FilePath.encodePath(`/${letter}/index.html`);
          const _artists_ = `<div class="artist"><a class="artist-container" href="${link}"><div class="letter">${letter}</div><div class="count ${countFontClass}">${artistTotal}</div></a></div>`;
          resolve(_artists_);
        });
      });
    });

    return Promise.all(requests).then(_results_ => _results_.join(''));
  }
};
