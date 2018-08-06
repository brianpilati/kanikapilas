var pool = require('../lib/database');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

async function getSongs() {
  return await pool.query('SELECT * FROM songs');
}

async function getSong(songId) {
  return await pool.query(`SELECT * FROM songs WHERE id = ${songId}`);
}

async function updateSong(song) {
  return await pool.query(`
    UPDATE
      songs
    SET
      title = '${song.title}',
      artist = '${song.artist}',
      stars = '${song.stars}'
    WHERE
      id = ${song.id}
  `);
}

async function insertSong(song) {
  return await pool.query(`
    INSERT INTO
      songs
    (
      'title',
      'artist',
      'stars'
    )
    VALUES 
    (
      '${song.title}',
      '${song.artist}',
      '${song.stars}'
    )
  `);
}

function returnError(res, code, message) {
  res.status(code).send(
    Object({
      status: code,
      error: message
    })
  );
}

app.get('/api/songs', cors(corsOptions), function(req, res) {
  const songs = [];
  getSongs().then(function(result) {
    result.forEach(function(song) {
      songs.push(song);
    });
    res.status(200).json(songs);
  });
});

app.get('/api/songs/:songId', cors(corsOptions), function(req, res) {
  getSong(req.params.songId).then(function(song) {
    if (song.length) {
      res.status(200).json(song.pop());
    } else {
      returnError(res, 404, 'Sorry, we cannot find that!');
    }
  });
});

app.put('/api/songs', cors(corsOptions), function(req, res) {
  updateSong(req.body).then(function() {
    res.status(200);
    res.send();
  });
});

app.post('/api/songs', cors(corsOptions), function(req, res) {
  insertSong(req.body).then(function(song) {
    console.log(song);
    res.status(200).json(song.pop());
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
