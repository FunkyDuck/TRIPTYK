const { v4: uuidv4 } = require('uuid');

const express = require('express');
const sqlite = require('sqlite3').verbose();
const path = require('path');

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
app.use(express.static('public'));
app.set('port', 4444);
console.log('Server listening on port :: ', app.get('port'));
app.listen(app.get('port'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/todo/todo.html'));
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

// GET BY ID
app.get('/api/v1/todos/:uuid', function (req, res) {
    db.get('SELECT * FROM todos WHERE uuid = ?', req.params.uuid, function (err, row) {
        var output = [];
        if (err) {
            console.log(err);
        } else {
            if (row.uuid.length === 0) {
                res.send('Todo not found...');
            } else {
                output.push({ uuid: row.uuid, label: row.label, done: row.done });
                res.send(output);
            }

        }
    });
    console.log(req.params.uuid);
});

// POST NEW
app.post('/api/v1/todos', function (req, res) {
    let uuid = uuidv4();
    let label = req.body.label;

    if (label !== '' && label != undefined && label != null) {
        db.run('INSERT INTO todos VALUES(?,?,?)', uuid, label, 0, function (err, row) {
            if (err) {
                console.log(err);
            } else {
                db.get('SELECT * FROM todos WHERE uuid = ?', uuid, function (err, row) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(row);
                    }
                })
            }
        });
    } else {
        res.send('Problem to add data');
    }
});

// PUT EXISTING
app.put('/api/v1/todos', function (req, res) {
    let uuid = req.body.uuid;
    let done = req.body.done;

    console.log(uuid)

    if (uuid !== '' && uuid !== undefined && uuid !== null && (done == 1 || done == 0)) {
        db.get('SELECT * FROM todos WHERE uuid = ?', uuid, function (err, row) {
            if (err) {
                console.log(err);
            } else {
                if (row.uuid.length === 0) {
                    res.send('Todo not found...');
                } else {
                    db.run('UPDATE todos SET done = ? WHERE uuid = ?', done, uuid, function (err, row) {
                        if (err) {
                            console.log(err);
                        } else {
                            db.get('SELECT * FROM todos WHERE uuid = ?', uuid, function (err, row) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(row);
                                }
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.send('Problem with your data');
    }
});