'use strict'
var mongoosePaginate = require('mongoose-pagination');
var Categoria = require('../models/categoria');
var SubCategoria = require('../models/subcategoria');
var Producto = require('../models/producto');



function getSubCategorias(req, res) {
    if (req.params.page == '-1') {
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

    var itemsPerPage = 5;

    SubCategoria.find().populate({path:'categoria'}).sort('nombre').paginate(page, itemsPerPage, (err, subCategorias, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!subCategorias) {
                res.status(404).send({ message: 'No hay Sub categorias' });
            } else {
                res.status(200).send({
                    total_items: total,
                    page_size: itemsPerPage,
                    subcategorias: subCategorias
                });
            }
        }

    });
}

function getSubCategoria(req, res) {
    var subCatId = req.params.id;

    SubCategoria.findById(subCatId).exec((err, subcategoria) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!subcategoria) {
                res.status(404).send({ message: 'La subCategoria no ha sido encontrada' });
            } else {
                res.status(200).send({ subcategoria });
            }
        }

    });
}

function saveSubCategoria(req, res) {
    var sCat = new SubCategoria();
    var params = req.body;

    sCat.nombre = params.nombre;
    sCat.categoria = params.categoria;

    sCat.save((err, sCatStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la sub categoria' });
        } else {
            if (!sCatStored) {
                res.status(404).send({ message: 'La sub categoria no ha sido guardada' });
            } else {
                res.status(200).send({ subcategoria: sCatStored });
            }
        }

    });
}

function updateSubCategoria(req, res) {
    var sCatId = req.params.id;
    var update = req.body;
    //{ new: true },
    SubCategoria.findByIdAndUpdate(sCatId , update, (err, subCategoriaUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la sub categoria' });
        } else {
            if (!subCategoriaUpdated) {
                res.status(404).send({ message: 'La sub categoria no ha sido actualizada' });
            } else {
                res.status(200).send({ subcategoria: subCategoriaUpdated });
            }
        }
    });
}

function deleteSubCategoria(req, res) {

    var id = req.params.id;

    Producto.find({ subcategoria: id }).count((err, count) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar la SubCategoria, no es posible listar los productos asociados' });
        } else {

            if (count == 0) {
                SubCategoria.findByIdAndRemove(id , (err, sCatRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al eliminar la subcategoria' });
                    } else {
                        if (!sCatRemoved) {
                            res.status(404).send({ message: 'La sub categoria no ha sido eliminada' });
                        } else {

                            res.status(200).send({ subcategoria: sCatRemoved });
                        }
                    }
                });
            } else {
                res.status(404).send({ message: 'Antes de eliminar la categoria, debe eliminar los productos asociadas.' });
            }
        }

    });
}

module.exports = {
    getSubCategorias,
    getSubCategoria,
    saveSubCategoria,
    updateSubCategoria,
    deleteSubCategoria
};