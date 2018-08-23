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

function getArtists() {
  const artistList = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ].sort();

  let artists = '';
  artistList.forEach(function(artist) {
    artists += `<div class="artist">${artist}</div>`;
  });

  return artists;
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
          <div class="song-page-body">
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
          <article class="article">
            <div class="article-title">
              Artists
            </div>
            <div class="artists">
              ${getArtists()}
            </div>
            <div class="article-title">
              Songs 
            </div>
            <div class="artists">
              ${getArtists()}
            </div>
            <div class="article-title">
              Genres
            </div>
            <div class="genres">
              ${getGenres()}
            </div>
            <div class="article-title">
              Recommended
            </div>
            <div class="recommended">
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Africa
                  </div>
                  <div class="track-sub-title">
                    Toto
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/4cedc78e976e45d88452261993ccebcd.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Manic Monday
                  </div>
                  <div class="track-sub-title">
                    The Bangles
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/8ebc6b59161a054258f9dff0aa989b98.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Africa
                  </div>
                  <div class="track-sub-title">
                    Toto
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/4cedc78e976e45d88452261993ccebcd.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Manic Monday
                  </div>
                  <div class="track-sub-title">
                    The Bangles
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/8ebc6b59161a054258f9dff0aa989b98.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Africa
                  </div>
                  <div class="track-sub-title">
                    Toto
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/4cedc78e976e45d88452261993ccebcd.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Manic Monday
                  </div>
                  <div class="track-sub-title">
                    The Bangles
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/8ebc6b59161a054258f9dff0aa989b98.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Africa
                  </div>
                  <div class="track-sub-title">
                    Toto
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/4cedc78e976e45d88452261993ccebcd.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Manic Monday
                  </div>
                  <div class="track-sub-title">
                    The Bangles
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/8ebc6b59161a054258f9dff0aa989b98.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Africa
                  </div>
                  <div class="track-sub-title">
                    Toto
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/4cedc78e976e45d88452261993ccebcd.png">
                </div>
              </div>
              <div class="track">
                <div class="track-title-container">
                  <div class="track-title">
                    Manic Monday
                  </div>
                  <div class="track-sub-title">
                    The Bangles
                  </div>
                </div>
                <div class="track-image">
                  <img src="https://lastfm-img2.akamaized.net/i/u/174s/8ebc6b59161a054258f9dff0aa989b98.png">
                </div>
              </div>
            </div>
          </article>
          <footer class="footer">Footer</footer>
        </div>
      </body>
    `;
  }
};
