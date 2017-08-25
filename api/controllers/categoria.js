'use strict'
var mongoosePaginate = require('mongoose-pagination');
var Categoria = require('../models/categoria');
var SubCategoria = require('../models/subcategoria');


function getCategorias(req, res) {
   
    if(req.params.page == '-1') {
        var page = 1;
        var itemsPerPage = 100;
    }
    else if (req.params.page) {
        var page = req.params.page;
        var itemsPerPage = 5;
    }
    else {
        var page = 1;
        var itemsPerPage = 100;
    }

    
    Categoria.find().sort('nombre').paginate(page, itemsPerPage, (err, categorias, total) => {
        
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!categorias) {
                res.status(404).send({ message: 'No hay categorias' });
            } else {
                res.status(200).send({
                    total_items: total,
                    page_size: itemsPerPage,
                    categorias: categorias
                });
            }
        }

    });
}

function getCategoria(req, res) {

    var catId = req.params.id;
    Categoria.findById(catId, (err, categoria) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!categoria) {
                res.status(404).send({ message: 'La categoria no ha sido encontrada' });
            } else {
                res.status(200).send({ categoria });
            }
        }

    });
}

function saveCategoria(req, res) {
    var cat = new Categoria();
    var params = req.body;

    cat.nombre = params.nombre;   

    cat.save((err, catStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la categoria' });
        } else {
            if (!catStored) {
                res.status(404).send({ message: 'La categoria no ha sido guardada' });
            } else {
                res.status(200).send({ categoria: catStored });
            }
        }

    });
}

function updateCategoria(req, res) {
    var catId = req.params.id;
    var update = req.body;
    //{ new: true },
    Categoria.findByIdAndUpdate(catId, update, (err, categoriaUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la categoria' });
        } else {
            if (!categoriaUpdated) {
                res.status(404).send({ message: 'La categoria no ha sido actualizada' });
            } else {
                res.status(200).send({ categoria: categoriaUpdated });
            }
        }
    });
}

function deleteCategoria(req, res) {
    var catId = req.params.id;

    SubCategoria.find({ categoria: catId }).count((err, count) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar la Categoria, no es posible listar las subcategorias asociadas' });
        } else {
           
            if (count == 0) {
                Categoria.findByIdAndRemove(catId, (err, catRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al eliminar la categoria' });
                    } else {
                        if (!catRemoved) {
                            res.status(404).send({ message: 'La categoria no ha sido eliminada' });
                        } else {

                            res.status(200).send({ categoria: catRemoved });
                        }
                    }
                });                
            } else {
                res.status(404).send({ message: 'Antes de eliminar la categoria, debe eliminar las subcategorias asociadas.' });
            }
        }

    });
}

module.exports = {
    getCategorias,
    getCategoria,
    saveCategoria,
    updateCategoria,
    deleteCategoria
};