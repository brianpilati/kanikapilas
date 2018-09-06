const pool = require('../../lib/database');

module.exports = {
  async getArtistFirstLetter() {
    return await pool.query(
      'SELECT SUBSTRING(artist, 1, 1) AS artistFirstLetter FROM songs WHERE active = 1 GROUP BY artistFirstLetter'
    );
  },

  async getActiveArtistsByLetter(letter) {
    return await pool.query(`SELECT * FROM songs WHERE artist LIKE "${letter}%" AND active = 1`);
  },

  async getActiveArtistsCountByLetter(letter) {
    return await pool.query(
      `SELECT COUNT(artist) as artist_total FROM songs WHERE artist LIKE "${letter}%" AND active = 1`
    );
  }
};
