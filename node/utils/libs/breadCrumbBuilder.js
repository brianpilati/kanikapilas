const titleBuilder = require('./titleBuilder');
const filePath = require('./filePath');
const sizes = require('./enums/font-sizes');

function buildBreadCrumb() {
  return `
    <a href="/"> &nbsp; ${titleBuilder.title('Home', sizes.small)}</a>
  `;
}

function buildArtistBreadCrumb(artist) {
  return `
    <a href="/artists/${filePath.getLetterUrl(artist)}"> &nbsp; ${titleBuilder.title(artist.charAt(0), sizes.small)}</a>
  `;
}

function buildSongBreadCrumb(artist) {
  return `
    <a href="${filePath.getArtistUrl(artist)}"> &nbsp; ${titleBuilder.title(artist, sizes.small)}</a>
  `;
}

module.exports = {
  buildBreadCrumb() {
    return `
      <div class="article-bread-crumb">
        <div class="active-article-bread-crumb-container">
          ${buildBreadCrumb()}
        </div>
      </div>
    `;
  },

  buildArtistBreadCrumb(artist) {
    return `
      <div class="article-bread-crumb">
        <div class="article-bread-crumb-container">
          ${buildBreadCrumb()}
        </div>
        <div class="article-divider"></div>
        <div class="active-article-bread-crumb-container">
          ${buildArtistBreadCrumb(artist)}
        </div>
      </div>
    `;
  },

  buildSongBreadCrumb(artist) {
    return `
      <div class="article-bread-crumb">
        <div class="article-bread-crumb-container">
          ${buildBreadCrumb(artist)}
        </div>
        <div class="article-divider"></div>
        <div class="article-bread-crumb-container">
          ${buildArtistBreadCrumb(artist)}
        </div>
        <div class="article-divider"></div>
        <div class="active-article-bread-crumb-container">
          ${buildSongBreadCrumb(artist)}
        </div>
        <div class="article-divider"></div>
      </div>
    `;
  }
};
