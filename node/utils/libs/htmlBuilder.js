var headBuilder = require('./headBuilder');
var bodyBuilder = require('./bodyBuilder');

module.exports = {
  buildSongHtml(song) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildSongHead(song)}
        ${bodyBuilder.buildSongBody(song)}
      </html>
    `;
  },

  buildSongsHtml(letter) {
    return bodyBuilder.buildSongsBody(letter).then(function(songsPage) {
      return `
        <!DOCTYPE html>
        <html lang="en">
          ${headBuilder.buildArtistHead()}
          ${songsPage}
        </html>
      `;
    });
  },

  buildIndexHtml(index, artists) {
    return bodyBuilder.buildIndexBody(artists).then(function(indexPage) {
      return `
        <!DOCTYPE html>
        <html lang="en">
          ${headBuilder.buildIndexHead(index)}
          ${indexPage}
        </html>
      `;
    });
  },

  buildGenreHtml(genre) {
    return bodyBuilder.buildGenreBody(genre).then(function(genrePage) {
      return `
        <!DOCTYPE html>
        <html lang="en">
          ${headBuilder.buildArtistHead()}
          ${genrePage}
        </html>
      `;
    });
  },

  buildArtistHtml(letter) {
    return bodyBuilder.buildArtistBody(letter).then(function(artistPage) {
      return `
        <!DOCTYPE html>
        <html lang="en">
          ${headBuilder.buildArtistHead()}
          ${artistPage}
        </html>
      `;
    });
  },

  buildArtistSongHtml(artist) {
    return bodyBuilder.buildArtistSongBody(artist).then(function(artistSongPage) {
      return `
        <!DOCTYPE html>
        <html lang="en">
          ${headBuilder.buildArtistHead()}
          ${artistSongPage}
        </html>
      `;
    });
  }
};
