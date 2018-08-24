//https://css-tricks.com/snippets/css/a-guide-to-flexbox/
var pool = require('../../lib/database');
const filePath = require('./filePath');
const fairUsePolicy = require('./fairUsePolicy');
const adBuilder = require('./adBuilder');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const recommendedSongsBuilder = require('./recommendedSongsBuilder');
const ArtistDomain = require('../../server/domains/artist');
const artistDomain = new ArtistDomain(pool);

function buildStars(starCount) {
  let stars = '';
  for (let count = 0; count < starCount; count++) {
    stars += '<img src="/assets/icons/flower-icon.png" alt="difficulty">';
  }
  return stars;
}

function getGenres() {
  const genreList = [
    'Country',
    'Classics',
    '80s and 90s',
    'Pop',
    'Oldies',
    'Spiritual',
    'Disney',
    'Fun',
    'Show Tunes',
    'Campfire',
    'Children',
    'Patriotic'
  ].sort();

  let genres = '';
  genreList.forEach(function(genre) {
    genres += `<div class="genre">${genre}</div>`;
  });

  return genres;
}

module.exports = {
  buildSongBody: function(song) {
    return `
      <body>
        <div class="background-splash"></div>
        <div class="song-page-container">
          <header class="song-page-header">
            <div class="kanikapilas-title">
            ${titleBuilder.getSiteTitle(sizes.large)}
            </div>
            <div>
              <img src="/assets/icons/flower-icon.png" alt="flower">
            </div>
          </header>
          <div class="page-body">
            <aside class="tshirt-container">
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
              <div class="tshirt-divider">
                ${adBuilder.adDivider()}
              </div>
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
              <div class="tshirt-divider">
                ${adBuilder.adDivider()}
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
              <div class="song-image-container">
                <img class="song-image" src="${filePath.getRelativeImageUrlPath(song, 2)}">
                <img class="song-image" src="${filePath.getRelativeImageUrlPath(song, 1)}">
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
                      First Note:
                    </div>
                    <div class="song-info-content">
                      ${song.firstNote}
                    </div>
                  </div>
                  <div class="song-info">
                    <div class="song-info-header">
                      Capo
                    </div>
                    <div class="song-info-content">
                      ${song.capo}
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
                  <div class="strum-pattern">
                    Practice Strum Patterns
                  </div>
                  <div class="login-cta">
                    Login to save and view personalized strum patterns.
                  </div>
                </div>
              </div>
            </article>
          </div>
          <footer class="legal">
            <div class="fair-use-policy">
              <p>
              <span>
                <img src="/assets/icons/flower-icon.png" alt="flower">
              </span>
              <span>
                ${titleBuilder.title('Legal', sizes.medium)}
              </span>
              <span>
                <img src="/assets/icons/flower-icon.png" alt="flower">
              </span>
              </p>
              ${fairUsePolicy.getText()}
            </div>
          </footer>
          <footer class="footer">Footer</footer>
        </div>
      </body>
    `;
  },

  buildIndexBody: function() {
    return `
      <body>
        <div class="background-splash"></div>
        <div class="index-page-container">
          <header class="index-page-header">
            <div class="kanikapilas-title">
            ${titleBuilder.getSiteTitle(sizes.large)}
            </div>
            <div>
              <img src="/assets/icons/flower-icon.png" alt="flower">
            </div>
          </header>
          <div class="page-body">
            <article class="article">
              <div class="article-title">
                Artists By Name  <hr>
              </div>
              <div class="artists">
                ${artistDomain.getArtists()}
              </div>
              <div class="article-title">
                Songs By Name  <hr>
              </div>
              <div class="artists">
                ${artistDomain.getArtists()}
              </div>
              <div class="article-title">
                Genres  <hr>
              </div>
              <div class="genres">
                ${getGenres()}
              </div>
              <div class="article-title">
                Recommended Songs <hr>
              </div>
              <div class="recommended">
                ${recommendedSongsBuilder.getRecommendedSongs()}
              </div>
            </article>
          </div>
          <footer class="footer">Footer</footer>
        </div>
      </body>
    `;
  },

  buildArtistBody: function(letter) {
    return `
      <body>
        <div class="background-splash"></div>
        <div class="song-page-container">
          <header class="song-page-header">
            <div class="kanikapilas-title">
            ${titleBuilder.getSiteTitle(sizes.large)}
            </div>
            <div>
              <img src="/assets/icons/flower-icon.png" alt="flower">
            </div>
          </header>
          <div class="page-body">
            <aside class="tshirt-container">
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
              <div class="tshirt-divider">
                ${adBuilder.adDivider()}
              </div>
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
              <div class="tshirt-divider">
                ${adBuilder.adDivider()}
              </div>
              <div class="tshirt">
                ${adBuilder.buildAd()}
              </div>
            </aside>
            <article class="article">
              <div class="song-title">
                Title
              </div>
              <div class="song-image-container">
                Song Image
              </div>
              </div>
            </article>
            <footer class="footer">Footer</footer>
          </div>
        </div>
      </body>
    `;
  }
};
