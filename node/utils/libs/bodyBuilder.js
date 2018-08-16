//https://css-tricks.com/snippets/css/a-guide-to-flexbox/
const filePath = require('./filePath');
const fairUsePolicy = require('./fairUsePolicy');
const adBuilder = require('./adBuilder');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');

module.exports = {
  buildBody: function(song) {
    return `
      <body>
        <div class="background-splash"></div>
        <div class="song-page-container">
          <header class="song-page-header">
            <div class="kanikapilas-title">
            ${titleBuilder.getSiteTitle(sizes.large)}
            </div>
            <div class="song-page-artist">
              ${titleBuilder.title(song.artist, sizes.small)}
            </div>
          </header>
          <div class="song-page-body">
            <aside class="tshirt-container">
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
            </aside>
            <article class="article">
              <div class="song-title">
                ${titleBuilder.title(song.title, sizes.medium)}
              </div>
              <div>
                <img class="song-image" src="${filePath.getRelativeImageUrlPath(song)}">
              </div>
              ${fairUsePolicy.getText()}
            </article>
          </div>
          <footer class="footer">Footer</footer>
        </div>
      </body>
    `;
  }
};
