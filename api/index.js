'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 27017;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mdb-bzmbsc-server-1/borzomi', {useMongoClient: true},(err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("Conexion a Base de datos esta funcionando correctamente.");
        app.listen(port, function () {
            console.log("Servidor del api rest de borzomi escuchando en http://localhost:" + port);
        });
    }

});