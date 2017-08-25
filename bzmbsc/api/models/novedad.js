'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NovedadSchema = Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    producto: { type: Schema.ObjectId, ref: 'Producto' }
});

module.exports = mongoose.model('Novedad', NovedadSchema);