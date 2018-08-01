var mysql = require('mysql');
var fs = require('fs');
var pool = require('./database');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

async function getUsers() {
  return await pool.query('SELECT * FROM user');
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  getUsers().then(function(result) {
    result.forEach(function(user) {
      res.write(user.User + '\n');
    });
    res.end('\n');
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});