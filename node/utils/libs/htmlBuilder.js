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

  buildIndexHtml(index) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildIndexHead(index)}
        ${bodyBuilder.buildIndexBody()}
      </html>
    `;
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
  }
};
