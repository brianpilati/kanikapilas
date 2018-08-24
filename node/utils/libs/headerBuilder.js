const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const constants = require('./constants');

module.exports = {
  getHeader: function() {
    return `
      <div class="kanikapilas-title">
        <a href="/">
          ${titleBuilder.getSiteTitle(sizes.large)}
        </a>
      </div>
      <div>
        <img src="/assets/icons/flower-icon.png" alt="flower">
      </div>
    `;
  }
};
