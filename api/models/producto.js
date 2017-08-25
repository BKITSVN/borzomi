'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TamanoPrecioSchema = Schema({
    tamano: String,
    precio: Number
});

var ProductoSchema = Schema({
    nombre: String,
    entrega: String,
    disponible: Boolean,
    exclusivo: Boolean,
    descripcion: String,
    colores: [{ type: String }],
    fotos: [{ type: String }],
    subcategoria: { type: Schema.ObjectId, ref: 'SubCategoria' },
    ambientes: [{ type: Schema.ObjectId, ref: 'Ambiente' }],
    tamanoprecio: [{ type: Schema.ObjectId, ref: 'TamanoPrecio' }]
});

module.exports = mongoose.model('Producto', ProductoSchema);
module.exports = mongoose.model('TamanoPrecio', TamanoPrecioSchema);