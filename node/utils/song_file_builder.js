var fs = require('fs');
var pool = require('../lib/database');

pool.query('SELECT * FROM songs').then(result => {
    result.forEach(song=> {
        fs.writeFile(`/tmp/test_${song.title}`, err => {
            if(err) {
                return console.log(err);
            }
            console.log(`The ${song.title} file was saved!`);
        }); 
    });
    pool.end();
});
