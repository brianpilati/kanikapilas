var pool = require('../lib/database');
var express = require('express')
var cors = require('cors')
var app = express()

async function getSongs() {
  return await pool.query('SELECT * FROM songs');
}

async function getSong(songId) {
  return await pool.query(`SELECT * FROM songs WHERE id = ${songId}`);
}

function returnError(res, code, message) {
  res.status(code).send(Object({
    status: code,
    error: message
  }));
}

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
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

app.get('/api/songs/:songId', cors(corsOptions), function (req, res) {
  getSong(req.params.songId).then(function(song) {
    if (song.length) {
      res.status(200).json(song.pop());
    } else {
      returnError(res, 404,'Sorry, we cannot find that!');
    }
  });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))