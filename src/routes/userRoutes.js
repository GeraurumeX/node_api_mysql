const User = require('../models/user');

module.exports = function(app) {
    app.get('/users', (req, res) => {
        User.getUsers((err, data) => {
            res.status(200).json(data);
        });
    });


    app.post('/users', (req, res) => {
        const userData = {
            id: null,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created_at: null,
            updated_at: null
        };

        User.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Usuario Insertado',
                    data: data
                });
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                });
            }
        });
    });


    app.put('/users/:id', (req, res) => {

        const userData = {
            id: req.params.id,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created_at: null,
            updated_at: null
        };
        User.updateUser(userData, (err, data) => {
            if (data && data.msg) {
                res.json(data);
            } else {
                res.json({
                    success: false,
                    msg: 'error'
                });
            }
        });
    });


    app.delete('/users/:id', (req, res) => {
        User.deleteUser(req.params.id, (err, data) => {
            if (data && data.msg === 'deleted' || data.msg === 'not exist') {
                res.json({
                    success: true,
                    data
                });
            } else {
                res.status(500).json({
                    msg: 'Error'
                });
            }
        });
    });

};