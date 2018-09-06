const pool = require('../../lib/database');
const filePath = require('../../utils/libs/filePath');

function getFindByTitle(letter) {
  return `(
    title LIKE "${letter}%"
    OR
    SUBSTRING(title, LENGTH(titlePrefix) + 2, LENGTH(title)) LIKE "${letter}%"
  )`;
}

module.exports = {
  async getSongs() {
    return await pool.query('SELECT * FROM songs');
  },

  async getActiveSongs() {
    return await pool.query('SELECT * FROM songs WHERE active = 1');
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

  async getActiveSongsByArtist(artist) {
    return await pool.query(`SELECT * FROM songs WHERE artist = '${artist}' AND active = 1`);
  },

  async getActiveSongsFirstLetter() {
    return await pool.query(
      'SELECT SUBSTRING(title, 1, 1) AS songFirstLetter FROM songs WHERE active = 1 GROUP BY songFirstLetter'
    );
  },

  async getActiveSongsByLetter(letter) {
    return await pool.query(`
      SELECT 
        *
      FROM 
        songs
      WHERE
        ${getFindByTitle(letter)}
        AND 
        active = 1
      GROUP BY title 
    `);
  },

  async getActiveSongsCountByLetter(letter) {
    return await pool.query(`
      SELECT 
        SUM(titles) as song_total 
      FROM (
        SELECT
          COUNT(title_groups) as titles 
        FROM (
          SELECT
            title as title_groups
          FROM
            songs
          WHERE 
            ${getFindByTitle(letter)}
            AND active = 1
          GROUP BY title 
        ) AS TILE_TABLE
      )
      AS COUNT_TABLE
    `);
  },

  async getActiveSongsByGenre(genre) {
    return await pool.query(`SELECT * FROM songs WHERE genre LIKE "%${genre}%" AND active = 1`);
  }
};
