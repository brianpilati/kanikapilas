var headBuilder = require('./headBuilder');
var bodyBuilder = require('./bodyBuilder');

const siteName = 'Kanikapilas.com';

module.exports = {
  buildHtml: function(song) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        ${headBuilder.buildHead(song)}
        ${bodyBuilder.buildBody(song)}
      </html>
    `;
  }
};
