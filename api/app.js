'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas

var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var subcategoria_routes = require('./routes/subcategoria');
var coleccion_routes = require('./routes/coleccion');
var ambiente_routes = require('./routes/ambiente');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//rutas base

app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', subcategoria_routes);
app.use('/api', coleccion_routes);
app.use('/api', ambiente_routes);

module.exports = app;