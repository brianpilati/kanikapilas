//https://css-tricks.com/snippets/css/a-guide-to-flexbox/
const filePath = require('./filePath');
const fairUsePolicy = require('./fairUsePolicy');
const adBuilder = require('./adBuilder');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');

function buildStars(starCount) {
  let stars = '';
  for (let count = 0; count < starCount; count++) {
    stars += '<img src="/assets/icons/flower-icon.png" alt="difficulty">';
  }
  return stars;
}

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
            <div class="copyright">
              Printing this song is a copyright violation
            </div>
            <article class="article">
              <div class="song-title">
                ${titleBuilder.title(song.title, sizes.medium)}
              </div>
              <div>
                <img class="song-image" src="${filePath.getRelativeImageUrlPath(song, 1)}">
                <img class="song-image" src="${filePath.getRelativeImageUrlPath(song, 2)}">
              </div>
              <div class="info-container">
                <div class="song-info-container">
                  <div class="song-info">
                    <div class="song-info-header">
                      Artist:
                    </div>
                    <div class="song-info-content">
                      ${song.artist}
                    </div>
                  </div>
                  <div class="song-info">
                    <div class="song-info-header">
                      Stars:
                    </div>
                    <div class="song-info-content">
                      ${buildStars(song.stars)}
                    </div>
                  </div>
                  <div class="song-info">
                    <div class="song-info-header">
                      Genre:
                    </div>
                    <div class="song-info-content">
                      ${song.genre}
                    </div>
                  </div>
                </div>
                <div class="song-info-strum-pattern">
                  Login to save and view personalized strum patterns.
                </div>
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
