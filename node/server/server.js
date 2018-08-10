var pool = require('../lib/database');
var path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var SongDomain = require('./domains/song');
const songDomain = new SongDomain(pool);

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(express.static(path.join(__dirname, '../../deployment')));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

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
  songDomain.getSongs().then(function(result) {
    result.forEach(function(song) {
      songs.push(song);
    });
    res.status(200).json(songs);
  });
});

app.get('/api/songs/:songId', cors(corsOptions), function(req, res) {
  songDomain.getSong(req.params.songId).then(function(song) {
    if (song.length) {
      res.status(200).json(song.pop());
    } else {
      returnError(res, 404, 'Sorry, we cannot find that!');
    }
  });
});

app.put('/api/songs', cors(corsOptions), function(req, res) {
  songDomain.updateSong(req.body).then(function() {
    res.status(200);
    res.send();
  });
});

app.post('/api/songs', cors(corsOptions), function(req, res) {
  songDomain.insertSong(req.body).then(function(response) {
    songDomain.getSong(response.insertId).then(function(song) {
      if (song.length) {
        res.status(200).json(song.pop());
      } else {
        returnError(res, 404, 'Sorry, we cannot find that!');
      }
    });
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
