var headBuilder = require('./headBuilder');

module.exports = {
  buildHtml: function(song) {
    return `
      <html>
        ${headBuilder.buildHead(song.title)}
      </html>
      <body>
      </body>
    `;
  }
};
