const songDomain = require('../../server/domains/song');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const FilePath = require('./filePath');

module.exports = {
  async getSongsByArtist(artist) {
    return await songDomain.getSongsByArtist(artist).then(function(results) {
      let songs = '';
      results.forEach(function(song) {
        const link = FilePath.encodePath(
          `/artists/${artist.charAt(0).toLowerCase()}/${song.artist}/${song.title}/index.html`
        );

        songs += `<div class="artist"><a href="${link}">${titleBuilder.title(song.title, sizes.small)}</a></div>`;
      });

      return songs;
    });
  }
};
