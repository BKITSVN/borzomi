'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IdeaSchema = Schema({
    titulo: String,
    fecha: Date,
    descripcion: String,
    foto: String,
    video:String
});

module.exports = mongoose.model('IdeaSchema', IdeaSchema);