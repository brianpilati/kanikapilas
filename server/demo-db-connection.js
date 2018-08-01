var fs = require('fs');
var pool = require('./database');

pool.query('SELECT * FROM user').then(result => {
    result.forEach(user => {
        fs.writeFile("/tmp/test_" + user.User, user.User, err => {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    });
    pool.end();
});