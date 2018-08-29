const songDomain = require('../../server/domains/song');
const titleBuilder = require('./titleBuilder');
const sizes = require('./enums/font-sizes');
const FilePath = require('./filePath');
const alphabet = require('../libs/enums/alphabet-enums');

const firstNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B', 'High C'];

module.exports = {
  async getSongsByArtist(artist) {
    const songObject = Object({
      songs: '',
      count: 0
    });
    return await songDomain.getSongsByArtist(artist).then(function(songs) {
      songs.forEach(function(song) {
        const link = FilePath.getRelativeFileUrl(song);

        songObject.songs += `<div class="artist"><a href="/${link}">${titleBuilder.title(
          song.title,
          sizes.small
        )}</a></div>`;
      });

      songObject.count = songs.length;
      return songObject;
    });
  },

  async getSongsByLetter(letter) {
    const songObject = Object({
      songs: '',
      count: 0
    });
    return await songDomain.getSongsByLetter(letter).then(function(songs) {
      songs.forEach(function(song) {
        const link = FilePath.getRelativeFileUrl(song);

        songObject.songs += `<div class="artist"><a href="/${link}">${titleBuilder.title(
          song.title,
          sizes.small
        )}</a></div>`;
      });

      songObject.count = songs.length;
      return songObject;
    });
  },

  async getSongsByRecommendation() {
    return await songDomain.getSongs();
  },

  getSongs() {
    let requests = alphabet.map(letter => {
      return new Promise(resolve => {
        songDomain.getSongsCountByLetter(letter).then(function(result) {
          const songTotal = result.length ? result[0].song_total : 0;

          let countFontClass = 'count-large';

          if (songTotal > 99) {
            countFontClass = 'count-small';
          } else if (songTotal > 10) {
            countFontClass = 'count-medium';
          }

          const link = FilePath.encodePath(`/songs/${letter}/index.html`);
          const _songs_ = `<div class="artist"><a class="artist-container" href="${link}"><div class="letter">${letter}</div><div class="count ${countFontClass}">${songTotal}</div></a></div>`;
          resolve(_songs_);
        });
      });
    });

    return Promise.all(requests).then(_results_ => _results_.join(''));
  },

  buildCapo(capo) {
    return capo === 0 ? 'none' : `${capo} fret`;
  },

  buildStars(starCount) {
    let stars = '';
    for (let count = 0; count < starCount; count++) {
      stars += '<img src="/assets/icons/flower-icon.png" alt="difficulty">';
    }
    return stars;
  },

  buildFirstNote(firstNoteIndex) {
    return firstNotes[firstNoteIndex];
  }
};
