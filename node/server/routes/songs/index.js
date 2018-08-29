const router = require('express').Router();
const cors = require('cors');
const corsOptions = require('../../libs/cors');
const songDomain = require('../../domains/song');

function returnError(res, code, message) {
  res.status(code).send(
    Object({
      status: code,
      error: message
    })
  );
}

router.get('', cors(corsOptions), function(req, res) {
  const songs = [];
  songDomain.getSongs().then(function(result) {
    result.forEach(function(song) {
      songs.push(song);
    });
    res.status(200).json(songs);
  });
});

router.get('/:songId', cors(corsOptions), function(req, res) {
  songDomain.getSong(req.params.songId).then(function(song) {
    if (song.length) {
      res.status(200).json(song.pop());
    } else {
      returnError(res, 404, 'Sorry, we cannot find that!');
    }
  });
});

router.put('', cors(corsOptions), function(req, res) {
  songDomain.updateSong(req.body).then(function() {
    res.status(200);
    res.send();
  });
});

router.post('', cors(corsOptions), function(req, res) {
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

module.exports = router;
