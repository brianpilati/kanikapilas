const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, '../../deployment')));

app.use('/local', express.static('../../deployment_local'));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use('/api', require('./routes'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
