class SongDomain {
  constructor(pool) {
    this.pool = pool;
  }

  async getSongs() {
    return await this.pool.query('SELECT * FROM songs');
  }

  async getSong(songId) {
    return await this.pool.query(`SELECT * FROM songs WHERE id = ${songId}`);
  }

  async updateSong(song) {
    return await this.pool.query(
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
        genre: song.genre
      }
    );
  }

  async insertSong(song) {
    return await this.pool.query(
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
        genre: song.genre
      }
    );
  }
}

module.exports = SongDomain;
