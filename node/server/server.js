var pool = require('../lib/database');
var express = require('express')
var cors = require('cors')
var app = express()

async function getSongs() {
  return await pool.query('SELECT * FROM songs');
}

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api/songs', cors(corsOptions), function (req, res) {
  const songs = [];
  getSongs().then(function(result) {
    result.forEach(function(song) {
      songs.push(song);
    });
    res.status(200).json(songs);
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))