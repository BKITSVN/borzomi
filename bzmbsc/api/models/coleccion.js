'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ColeccionSchema = Schema({
    nombre: String 
});

module.exports = mongoose.model('Colecciones', ColeccionSchema);