//https://css-tricks.com/snippets/css/a-guide-to-flexbox/
const filePath = require('./filePath');
const fairUsePolicy = require('./fairUsePolicy');
const adBuilder = require('./adBuilder');
const headerBuilder = require('./headerBuilder');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const recommendedSongsBuilder = require('./recommendedSongsBuilder');
const artistBuilder = require('./artistBuilder');
const songBuilder = require('./songBuilder');

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
  buildSongBody(song) {
    return `
      <body>
        <div class="background-splash"></div>
        <div class="page-container">
          <header class="page-header">
            ${headerBuilder.getHeader()}
          </header>
          <div class="page-body">
            <aside>
              ${adBuilder.buildAsideAds()}
            </aside>
            <div class="copyright">
              Printing this song is a copyright violation
            </div>
            <article class="article">
              <div class="article-bread-crumb">
                <a href="/${filePath.getArtistUrl(song)}"> << &nbsp; ${titleBuilder.title(song.artist, sizes.small)}</a>
              </div>
              <div class="article-title">
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

  buildIndexBody() {
    return `
      <body>
        <div class="background-splash"></div>
        <div class="page-container">
          <header class="page-header">
            ${headerBuilder.getHeader()}
          </header>
          <div class="page-body">
            <article class="article">
              <div class="article-title">
                Artists By Name  <hr>
              </div>
              <div class="artists">
                ${artistBuilder.getArtists()}
              </div>
              <div class="article-title">
                Songs By Name  <hr>
              </div>
              <div class="artists">
                ${songBuilder.getSongs()}
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

  buildArtistBody(letter) {
    return artistBuilder.getArtistsByLetter(letter).then(function(artists) {
      return `
        <body>
          <div class="background-splash"></div>
          <div class="page-container">
            <header class="page-header">
              ${headerBuilder.getHeader()}
            </header>
            <div class="page-body">
              <aside>
                ${adBuilder.buildAsideAds()}
              </aside>
              <article class="article">
                <div class="article-bread-crumb">
                  <a href="/"><< &nbsp; ${titleBuilder.title('Home', sizes.small)}</a>
                </div>
                <div class="article-title">
                  Artists starting with '${letter.toUpperCase()}' 
                </div>
                <div class="artist-container">
                  ${artists}
                </div>
                </div>
              </article>
              <footer class="footer">Footer</footer>
            </div>
          </div>
        </body>
      `;
    });
  },

  buildArtistSongBody(artist) {
    return songBuilder.getSongsByArtist(artist).then(function(songs) {
      return `
        <body>
          <div class="background-splash"></div>
          <div class="page-container">
            <header class="page-header">
              <div class="kanikapilas-title">
              ${titleBuilder.getSiteTitle(sizes.large)}
              </div>
              <div>
                <img src="/assets/icons/flower-icon.png" alt="flower">
              </div>
            </header>
            <div class="page-body">
              <aside>
                ${adBuilder.buildAsideAds()}
              </aside>
              <article class="article">
                <div class="article-bread-crumb">
                  <a href="/${filePath.getLetterUrl(
                    song
                  )}"><< &nbsp; ${titleBuilder.title(artist.charAt(0), sizes.small)}</a>
                </div>
                <div class="article-title">
                  ${artist}
                </div>
                <div class="artist-container">
                  ${songs}
                </div>
                </div>
              </article>
              <footer class="footer">Footer</footer>
            </div>
          </div>
        </body>
      `;
    });
  },

  buildSongsBody(letter) {
    return songBuilder.getSongsByLetter(letter).then(function(songs) {
      return `
        <body>
          <div class="background-splash"></div>
          <div class="page-container">
            <header class="page-header">
              <div class="kanikapilas-title">
              ${titleBuilder.getSiteTitle(sizes.large)}
              </div>
              <div>
                <img src="/assets/icons/flower-icon.png" alt="flower">
              </div>
            </header>
            <div class="page-body">
              <aside>
                ${adBuilder.buildAsideAds()}
              </aside>
              <article class="article">
                <div class="article-title">
                  Songs starting with '${letter.toUpperCase()}' 
                </div>
                <div class="artist-container">
                  ${songs}
                </div>
                </div>
              </article>
              <footer class="footer">Footer</footer>
            </div>
          </div>
        </body>
      `;
    });
  }
};
