const pool = require('../../lib/database');
const filePath = require('../../utils/libs/filePath');

module.exports = {
  async getSongs() {
    return await pool.query('SELECT * FROM songs');
  },

  async getSong(songId) {
    return await pool.query(`SELECT * FROM songs WHERE id = ${songId}`);
  },

  async updateSong(song) {
    return await pool.query(
      `
      UPDATE
        songs
      SET
        ?
      WHERE
        id = ${song.id}
    `,
      {
        titlePrefix: song.titlePrefix,
        title: song.title,
        artistPrefix: song.artistPrefix,
        artist: song.artist,
        stars: song.stars,
        flowered: song.flowered,
        genre: song.genre,
        imageName: filePath.encodePath(song.imageName),
        imagetop: song.imageTop,
        imageBottom: song.imageBottom,
        firstNote: song.firstNote,
        capo: song.capo,
        chords: song.chords,
        octave: song.octave,
        coverArtUrl: song.coverArtUrl
      }
    );
  },

  async insertSong(song) {
    return await pool.query(
      `
      INSERT INTO
        songs
      SET
        ?
    `,
      {
        titlePrefix: song.titlePrefix,
        title: song.title,
        artistPrefix: song.artistPrefix,
        artist: song.artist,
        stars: song.stars,
        flowered: song.flowered,
        genre: song.genre,
        imageName: filePath.encodePath(song.imageName),
        imagetop: song.imageTop,
        imageBottom: song.imageBottom,
        createdDate: new Date()
          .toJSON()
          .slice(0, 19)
          .replace('T', ' '),
        firstNote: song.firstNote,
        capo: song.capo,
        chords: song.chords,
        octave: song.octave,
        coverArtUrl: song.coverArtUrl
      }
    );
  },

  async replaceSong(song) {
    return await pool
      .query(`SELECT * FROM songs WHERE artist = '${song.artist}' and title = '${song.title}'`)
      .then(songs => {
        if (songs.length > 0) {
          return songs[0];
        } else {
          return this.insertSong(song).then(response => {
            return this.getSong(response.insertId).then(songs => {
              return songs[0];
            });
          });
        }
      });
  },

  async deactivateSong(songId) {
    return await pool.query(`UPDATE songs SET active = 0 WHERE id = '${songId}'`);
  },

  async activateSong(songId) {
    return await pool.query(`UPDATE songs SET active = 1 WHERE id = '${songId}'`);
  },

  async getSongsByArtist(artist) {
    return await pool.query(`SELECT * FROM songs WHERE artist = '${artist}'`);
  },

  async getSongsFirstLetter() {
    return await pool.query('SELECT SUBSTRING(title, 1, 1) AS songFirstLetter FROM songs GROUP BY songFirstLetter');
  },

  async getSongsByLetter(letter) {
    return await pool.query(`SELECT * FROM songs where title like "${letter}%"`);
  },

  async getSongsCountByLetter(letter) {
    return await pool.query(`SELECT COUNT(title) as song_total FROM songs where title like "${letter}%"`);
  },

  async getSongsByGenre(genre) {
    return await pool.query(`SELECT * FROM songs where genre like "%${genre}%"`);
  }
};
