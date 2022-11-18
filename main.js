const express = require('express');
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('triptyktest.db');

db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS todos(uuid TEXT, label TEXT, done INTEGER DEFAULT 0)');
    db.all('SELECT * FROM todos', function (err, row) {
        if (err) {
            console.log(err)
        } else {
            if (row.length === 0) {
                var stmt = db.prepare('INSERT INTO todos VALUES(?,?,?)');
                var obj = [{ uuid: '00000000-0000-0000-0000-000000000000', label: 'Faire mon repository', done: 0 }];
                for(let i in obj){
                    stmt.run(obj[i].uuid,obj[i].label,obj[i].done);
                }
                stmt.finalize();
            }else{
                console.log('DB exists');
            }
        }
    });
});

const app=express();
app.use(express.json());
app.set('port',4444);
console.log('Server listening on port :: ',app.get('port'));
app.listen(app.get('port'));