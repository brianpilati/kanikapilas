const pool = require('../../lib/database');

module.exports = {
  async getArtistFirstLetter() {
    return await pool.query(
      'SELECT SUBSTRING(artist, 1, 1) AS artistFirstLetter FROM songs GROUP BY artistFirstLetter'
    );
  },

  async getArtistsByLetter(letter) {
    return await pool.query(`SELECT * FROM songs where artist like "${letter}%"`);
  }
};
