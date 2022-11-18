import {v4 as uuid} from 'uuid';

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
                for (let i in obj) {
                    stmt.run(obj[i].uuid, obj[i].label, obj[i].done);
                }
                stmt.finalize();
            } else {
                console.log('DB exists');
            }
        }
    });
});

const app = express();
app.use(express.json());
app.set('port', 4444);
console.log('Server listening on port :: ', app.get('port'));
app.listen(app.get('port'));

app.get('/', function (req, res) {
    res.send('API V1');
});

// GET ALL
app.get('/api/v1/todos', function (req, res) {
    db.all('SELECT * FROM todos', function (err, rows) {
        var output = [];
        if (err) {
            console.log(err);
        } else {
            if (rows.length === 0) {
                res.send('Database is empty');
            } else {
                rows.forEach(function (row) {
                    output.push({ uuid: row.uuid, label: row.label, done: row.done });
                });
                res.send(output);
            }
        }
    });
});

// POST NEW
app.post('/api/vi/todos',function(req,res){
    let uuid=uuid();
});