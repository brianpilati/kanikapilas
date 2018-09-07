const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');

module.exports = {
  getHeader: function() {
    return `
      <header class="page-header tiki-tropic">
        <div class="kanikapilas-title-container">
          <div class="kanikapilas-title">
            <a href="/">
              ${titleBuilder.getSiteTitle(sizes.large)}
            </a>
          </div>
          <div class="kanikapilas-sub-title">
            The Ultimate Collection of Ukulele Songs
          </div>
        </div>
        <div>
          <img src="/assets/icons/flower-icon.png" alt="flower">
        </div>
      </header>
    `;
  }
};
