const pool = require('../../lib/database');

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
        title: song.title,
        artist: song.artist,
        stars: song.stars,
        flowered: song.flowered,
        genre: song.genre,
        imageName: song.imageName,
        imagetop: song.imageTop,
        imageBottom: song.imageBottom,
        firstNote: song.firstNote,
        capo: song.capo,
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
        title: song.title,
        artist: song.artist,
        stars: song.stars,
        flowered: song.flowered,
        genre: song.genre,
        imageName: song.imageName,
        imagetop: song.imageTop,
        imageBottom: song.imageBottom,
        createdDate: Date().now,
        firstNote: song.firstNote,
        capo: song.capo,
        coverArtUrl: song.coverArtUrl
      }
    );
  },

  async getSongsByArtist(artist) {
    return await pool.query(`SELECT * FROM songs WHERE artist = '${artist}'`);
  }
};
