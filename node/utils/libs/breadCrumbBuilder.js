const titleBuilder = require('./titleBuilder');
const filePath = require('./filePath');
const sizes = require('./enums/font-sizes');

function buildBreadCrumb() {
  return `
    <a href="/"><< &nbsp; ${titleBuilder.title('Home', sizes.small)}</a>
  `;
}

function buildArtistBreadCrumb(artist) {
  return `
    <a href="/artists/${filePath.getLetterUrl(artist)}"><< &nbsp; ${titleBuilder.title(
    artist.charAt(0),
    sizes.small
  )}</a>
  `;
}

function buildSongBreadCrumb(artist) {
  return `
    <a href="${filePath.getArtistUrl(artist)}"> << &nbsp; ${titleBuilder.title(artist, sizes.small)}</a>
  `;
}

module.exports = {
  buildBreadCrumb() {
    return `
      <div class="article-bread-crumb">
        ${buildBreadCrumb()}
      </div>
    `;
  },

  buildArtistBreadCrumb(artist) {
    return `
      <div class="article-bread-crumb">
        ${buildBreadCrumb()}
        &nbsp;
        ${buildArtistBreadCrumb(artist)}
      </div>
    `;
  },

  buildSongBreadCrumb(artist) {
    return `
      <div class="article-bread-crumb">
        ${buildBreadCrumb(artist)}
        &nbsp;
        ${buildArtistBreadCrumb(artist)}
        &nbsp;
        ${buildSongBreadCrumb(artist)}
      </div>
    `;
  }
};
