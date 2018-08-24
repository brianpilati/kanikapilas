module.exports = {
  getRecommendedSongs: function() {
    const recommendedSongList = [
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

    let recommendedSongs = '';
    recommendedSongList.forEach(function(song) {
      recommendedSongs += `<div class="track">
        <div class="track-title-container">
          <div class="track-title">
            Africa 
          </div>
          <div class="track-sub-title">
            Toto
          </div>
        </div>
        <div class="track-image-container">
          <img
            class="track-image"
            src="https://lastfm-img2.akamaized.net/i/u/174s/4cedc78e976e45d88452261993ccebcd.png">
        </div>
      </div>
      `;
    });

    return recommendedSongs;
  }
};
