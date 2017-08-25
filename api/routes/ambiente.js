'use strict'

var express = require('express');
var AmbienteController = require('../controllers/ambiente');
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/ambientes' });

var api = express.Router();

api.get('/ambiente/:id',AmbienteController.getAmbiente);
api.post('/ambiente/', md_auth.ensureAuth, AmbienteController.saveAmbiente);
api.get('/ambientes/:coleccion?', AmbienteController.getAmbientesByColeccion);
api.get('/ambientes-paging/:id', AmbienteController.getAmbientes);
api.put('/ambiente/:id', AmbienteController.updateAmbiente);
api.delete('/ambiente/:id', md_auth.ensureAuth, AmbienteController.deleteAmbiente);
api.post('/upload-image-ambiente/:id', [md_auth.ensureAuth, md_upload], AmbienteController.uploadImage);
api.get('/get-image-ambiente/:imageFile', AmbienteController.getImageFile)


module.exports = api;