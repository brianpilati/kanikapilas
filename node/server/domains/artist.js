class ArtistDomain {
  constructor(pool) {
    this.pool = pool;
  }

  async getArtistFirstLetter() {
    return await this.pool.query(
      'SELECT SUBSTRING(artist, 1, 1) AS artistFirstLetter FROM songs GROUP BY artistFirstLetter'
    );
  }

  getArtists() {
    const artistList = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ].sort();

    let artists = '';
    artistList.forEach(function(artist) {
      artists += `<div class="artist"><a href="/artists/${artist}/index.html">${artist}</a></div>`;
    });

    return artists;
  }
}

module.exports = ArtistDomain;
