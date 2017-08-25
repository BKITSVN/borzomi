'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromocionSchema = Schema({
    nombre: String,
    precio: Number,
    desctipcion: String,
    producto: { type: Schema.ObjectId, ref: 'Producto' }
});

module.exports = mongoose.model('Promocion', PromocionSchema);