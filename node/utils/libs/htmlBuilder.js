var headBuilder = require('./headBuilder');
var bodyBuilder = require('./bodyBuilder');

module.exports = {
  buildSongHtml: function(song) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildSongHead(song)}
        ${bodyBuilder.buildSongBody(song)}
      </html>
    `;
  },

  buildIndexHtml: function(index) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildIndexHead(index)}
        ${bodyBuilder.buildIndexBody()}
      </html>
    `;
  }
};
