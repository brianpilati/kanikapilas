//https://css-tricks.com/snippets/css/a-guide-to-flexbox/
const filePath = require('./filePath');
const fairUsePolicy = require('./fairUsePolicy');
const adBuilder = require('./adBuilder');
const headerBuilder = require('./headerBuilder');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const recommendedSongsBuilder = require('./recommendedSongsBuilder');
const artistBuilder = require('./artistBuilder');
const breadCrumbBuilder = require('./breadCrumbBuilder');
const songBuilder = require('./songBuilder');
const genreBuilder = require('./genreBuilder');

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
              ${breadCrumbBuilder.buildSongBreadCrumb(song.artist)}
              <div class="article-title">
                ${titleBuilder.title(song.title, sizes.medium)}
              </div>
              <div class="song-image-container">
                <img class="song-image" src="/${filePath.getRelativeImageUrlPath(song, 2)}">
                <img class="song-image" src="/${filePath.getRelativeImageUrlPath(song, 1)}">
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
                  <div class="song-info first-note">
                    <div class="song-info-header">
                      First Note:
                    </div>
                    <div class="song-info-content">
                      ${songBuilder.buildFirstNote(song.firstNote)}
                    </div>
                  </div>
                  <div class="song-info">
                    <div class="song-info-header">
                      Capo
                    </div>
                    <div class="song-info-content">
                      ${songBuilder.buildCapo(song.capo)}
                    </div>
                  </div>
                  <div class="song-info">
                    <div class="song-info-header">
                      Stars:
                    </div>
                    <div class="song-info-content">
                      ${songBuilder.buildStars(song.stars)}
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

  buildIndexBody(artists, songs) {
    return recommendedSongsBuilder.getRecommendedSongs().then(function(recommendedSongs) {
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
                  ${artists}
                </div>
                <div class="article-title">
                  Songs By Name  <hr>
                </div>
                <div class="artists">
                  ${songs}
                </div>
                <div class="article-title">
                  Genres  <hr>
                </div>
                <div class="genres">
                  ${genreBuilder.getGenres()}
                </div>
                <div class="article-title">
                  Recommended Songs <hr>
                </div>
                <div class="recommended">
                  ${recommendedSongs}
                </div>
              </article>
            </div>
            <footer class="footer">Footer</footer>
          </div>
          <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
          <script type="text/javascript" src="/libs/slick.min.js"></script>
          <script type="text/javascript">
            $(document).ready(function(){
              $('.genres').slick({
                centerMode: true,
                infinite: true,
                centerPadding: '60px',
                slidesToShow: 5,
                responsive: [
                  {
                    breakpoint: 992,
                    settings: {
                      centerMode: true,
                      centerPadding: '20px',
                      slidesToShow: 3
                    }
                  }
                ]
              });
            });
          </script>
        </body>
      `;
    });
  },

  buildArtistBody(letter) {
    return artistBuilder.getActiveArtistsByLetter(letter).then(function(artistObject) {
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
                ${breadCrumbBuilder.buildBreadCrumb()}
                <div class="article-title">
                  ${artistObject.count} Artists starting with '${letter.toUpperCase()}' 
                </div>
                <div class="artist-container">
                  ${artistObject.artists}
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
    return songBuilder.getActiveSongsByArtist(artist).then(function(songObject) {
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
                ${breadCrumbBuilder.buildArtistBreadCrumb(artist)}
                <div class="article-title">
                  ${artist} (${songObject.count})
                </div>
                <div class="artist-container">
                  ${songObject.songs}
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
    return songBuilder.getActiveSongsByLetter(letter).then(function(songsObject) {
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
                ${breadCrumbBuilder.buildBreadCrumb()}
                <div class="article-title">
                  (${songsObject.count}) Songs starting with '${letter.toUpperCase()}' 
                </div>
                <div class="artist-container">
                  ${songsObject.songs}
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

  buildGenreBody(genre) {
    return genreBuilder.getActiveSongsByGenre(genre).then(function(genres) {
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
                ${breadCrumbBuilder.buildBreadCrumb()}
                <div class="article-title">
                  ${genre}
                </div>
                <div class="artist-container">
                  ${genres}
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
