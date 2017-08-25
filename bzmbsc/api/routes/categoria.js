'use strict'

var express = require('express');
var CategoriaController = require('../controllers/categoria');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();



api.get('/categoria/:id', md_auth.ensureAuth, CategoriaController.getCategoria);
api.post('/categoria', md_auth.ensureAuth, CategoriaController.saveCategoria);
api.get('/categorias/:page?', CategoriaController.getCategorias);
api.put('/categoria/:id', md_auth.ensureAuth, CategoriaController.updateCategoria);
api.delete('/categoria/:id', md_auth.ensureAuth, CategoriaController.deleteCategoria);


module.exports = api;