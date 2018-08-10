var headBuilder = require('./headBuilder');
var bodyBuilder = require('./bodyBuilder');

module.exports = {
  buildHtml: function(song) {
    return `
      <html>
        ${headBuilder.buildHead(song)}
        ${bodyBuilder.buildBody(song)}
      </html>
    `;
  }
};
