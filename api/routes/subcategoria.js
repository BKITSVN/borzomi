'use strict'

var express = require('express');
var SubCategoriaController = require('../controllers/subcategoria');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();



api.get('/subcategoria/:id', md_auth.ensureAuth, SubCategoriaController.getSubCategoria);
api.post('/subcategoria', md_auth.ensureAuth, SubCategoriaController.saveSubCategoria);
api.get('/subcategorias/:page?', SubCategoriaController.getSubCategorias);
api.put('/subcategoria/:id', md_auth.ensureAuth, SubCategoriaController.updateSubCategoria);
api.delete('/subcategoria/:id', md_auth.ensureAuth, SubCategoriaController.deleteSubCategoria);


module.exports = api;