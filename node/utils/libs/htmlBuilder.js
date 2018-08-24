var headBuilder = require('./headBuilder');
var bodyBuilder = require('./bodyBuilder');

class HtmlBuilder {
  constructor(pool) {
    this.pool = pool;
  }

  buildSongHtml(song) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildSongHead(song)}
        ${bodyBuilder.buildSongBody(song)}
      </html>
    `;
  }

  buildIndexHtml(index) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildIndexHead(index)}
        ${bodyBuilder.buildIndexBody()}
      </html>
    `;
  }

  buildArtistHtml(letter) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildArtistHead()}
        ${bodyBuilder.buildArtistBody(letter)}
      </html>
    `;
  }
}

module.exports = HtmlBuilder;
