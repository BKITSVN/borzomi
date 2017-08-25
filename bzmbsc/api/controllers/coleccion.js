'use strict'
var mongoosePaginate = require('mongoose-pagination');
var Coleccion = require('../models/coleccion');
var Ambiente = require('../models/ambiente');



function getColecciones(req, res) {
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


    Coleccion.find().sort('nombre').paginate(page, itemsPerPage, (err, colecciones, total) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!colecciones) {
                res.status(404).send({ message: 'No hay colecciones' });
            } else {
                res.status(200).send({
                    total_items: total,
                    page_size: itemsPerPage,
                    colecciones: colecciones
                });
            }
        }

    });
}

function getColeccion(req, res) {
    var id = req.params.id;
    Coleccion.findById(id, (err, coleccion) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!coleccion) {
                res.status(404).send({ message: 'La coleccion no ha sido encontrada' });
            } else {
                res.status(200).send({ coleccion });
            }
        }

    });
}

function saveColeccion(req, res) {
    var col = new Coleccion();
    var params = req.body;

    col.nombre = params.nombre;
    
    col.save((err, colStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la coleccion' });
        } else {
            if (!colStored) {
                res.status(404).send({ message: 'La coleccion no ha sido guardada' });
            } else {
                res.status(200).send({ coleccion: colStored });
            }
        }

    });
}

function updateColeccion(req, res) {
    var id = req.params.id;
    var update = req.body;
    //{ new: true },
    Coleccion.findByIdAndUpdate(id, update, (err, colUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la coleccion' });
        } else {
            if (!colUpdated) {
                res.status(404).send({ message: 'La coleccion no ha sido actualizada' });
            } else {
                res.status(200).send({ coleccion: colUpdated });
            }
        }
    });
}

function deleteColeccion(req, res) {
    var id = req.params.id;

    Ambiente.find({ coleccion: id }).count((err, count) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar la coleccion, no es posible listar los ambientes asociados' });
        } else {

            if (count == 0) {
                Coleccion.findByIdAndRemove(id, (err, colRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al eliminar la coleccion' });
                    } else {
                        if (!colRemoved) {
                            res.status(404).send({ message: 'La coleccion no ha sido eliminada' });
                        } else {

                            res.status(200).send({ coleccion: colRemoved });
                        }
                    }
                });
            } else {
                res.status(404).send({ message: 'Antes de eliminar la coleccion, debe eliminar los ambientes asociados.' });
            }
        }

    });

}

module.exports = {
    getColecciones,
    getColeccion,
    saveColeccion,
    updateColeccion,
    deleteColeccion
};
