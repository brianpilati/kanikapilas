const songBuilder = require('./songBuilder');
const FilePath = require('../libs/filePath');

module.exports = {
  getRecommendedSongs: function() {
    let recommendedSongs = '';
    return songBuilder.getSongsByRecommendation().then(function(songs) {
      songs.forEach(function(song) {
        recommendedSongs += `<a href="${FilePath.getRelativeFileUrl(song)}">
          <div class="track">
            <div class="track-title-container">
              <div class="track-title">
                ${song.title}
              </div>
              <div class="track-sub-title">
                ${song.artist}
              </div>
            </div>
            <div class="track-image-container">
              <img
                class="track-image"
                src="${song.coverArtUrl}">
            </div>
          </div>
        </a>
        `;
      });
      return recommendedSongs;
    });
  }
};
