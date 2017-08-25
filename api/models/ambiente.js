'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AmbienteSchema = Schema({
    nombre: String,
    coleccion: { type: Schema.ObjectId, ref: 'Coleccion' },
    fotos: [{type: String}]
});

module.exports = mongoose.model('Ambiente', AmbienteSchema);