'use strict'

var express = require('express');
var ColeccionController = require('../controllers/coleccion');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();



api.get('/coleccion/:id', ColeccionController.getColeccion);
api.post('/coleccion', md_auth.ensureAuth, ColeccionController.saveColeccion);
api.get('/colecciones/:page?', ColeccionController.getColecciones);
api.put('/coleccion/:id', md_auth.ensureAuth, ColeccionController.updateColeccion);
api.delete('/coleccion/:id', md_auth.ensureAuth, ColeccionController.deleteColeccion);


module.exports = api;