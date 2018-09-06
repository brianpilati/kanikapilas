const pool = require('../../lib/database');

function getFindByArtist(letter) {
  return `(
    artist LIKE "${letter}%"
    OR
    SUBSTRING(artist, LENGTH(artistPrefix) + 2, LENGTH(artist)) LIKE "${letter}%"
  )`;
}

module.exports = {
  async getArtistFirstLetter() {
    return await pool.query(`
      SELECT
        SUBSTRING(artist, 1, 1) AS artistFirstLetter
      FROM
        songs
      WHERE
        active = 1
      GROUP BY artistFirstLetter
    `);
  },

  async getActiveArtistsByLetter(letter) {
    return await pool.query(`
      SELECT 
        *
      FROM 
        songs
      WHERE
        ${getFindByArtist(letter)}
        AND 
        active = 1
      GROUP BY artist
    `);
  },

  async getActiveArtistsCountByLetter(letter) {
    return await pool.query(`
      SELECT 
        SUM(artists) as artist_total
      FROM (
        SELECT
          COUNT(artist_groups) as artists 
        FROM (
          SELECT
            artist as artist_groups
          FROM
            songs
          WHERE 
            ${getFindByArtist(letter)}
            AND active = 1
          GROUP BY artist
        ) AS ARTIST_TABLE
      )
      AS COUNT_TABLE
    `);
  }
};
