'use strict'
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Ambiente = require('../models/ambiente');
var Producto = require('../models/ambiente');


function getAmbientes(req, res) {

    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsPerPage = 100;

    Ambiente.find().sort('nombre').paginate(page, itemsPerPage, (err, ambientes, total) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion.' });
        } else {
            if (!ambientes) {
                res.status(404).send({ message: 'No hay ambientes' });
            } else {
                res.status(200).send({
                    total_items: total,
                    ambientes: ambientes
                });
            }
        }

    });
}


function getAmbientesByColeccion(req, res)
{
    var id = req.params.coleccion;

    if (!id) {
        //Obtener todos los ambientes de la BBDD
        var find = Ambiente.find({}).sort('nombre');
    } else {
        //Sacar ambiente en particular
        var find = Ambiente.find({ coleccion: id}).sort('nombre');
    }

    find.populate({ path: 'coleccion' }).exec((err, ambientes) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!ambientes) {
                res.status(404).send({ message: 'No hay Ambientes' });
            } else {
                res.status(200).send({ ambientes });
            }
        }
    });
}


function getAmbiente(req, res) {
    var id = req.params.id;

    Ambiente.findById(id, (err, ambiente) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!ambiente) {
                res.status(404).send({ message: 'El ambiente no ha sido encontrado' });
            } else {
                res.status(200).send({ ambiente });
            }
        }

    });
}

function saveAmbiente(req, res) {
    var amb = new Ambiente();
    var params = req.body;

    amb.nombre = params.nombre;
    amb.coleccion = params.coleccion;


    amb.save((err, ambStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el ambiente' });
        } else {
            if (!ambStored) {
                res.status(404).send({ message: 'El ambiente no ha sido guardado' });
            } else {
                res.status(200).send({ ambiente: ambStored });
            }
        }

    });
}

function updateAmbiente(req, res) {
    var id = req.params.id;
    var update = req.body;
    //{ new: true },
    Ambiente.findByIdAndUpdate(id, update, (err, ambienteUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el ambiente' });
        } else {
            if (!ambienteUpdated) {
                res.status(404).send({ message: 'El ambiente no ha sido actualizado' });
            } else {
                res.status(200).send({ ambiente: ambienteUpdated });
            }
        }
    });
}

function deleteAmbiente(req, res) {
    var id = req.params.id;
    fs.re
    Producto.find({ ambiente: id}).count((err, count) => {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el Ambiente, no es posible listar los productos asociadas' });
        } else {

            if (count == 0) {
                
                Ambiente.findByIdAndRemove(id, (err, ambRemoved) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al eliminar el ambiente' });
                    } else {
                        if (!ambRemoved) {
                            res.status(404).send({ message: 'El ambienteno ha sido eliminada' });
                        } else {
                            ambRemoved.fotos.forEach(function (filename) {
                                fs.unlink('./uploads/ambiente/' + filename);
                            });                            
                            res.status(200).send({ ambiente: ambRemoved});
                        }
                    }
                });
            } else {
                res.status(404).send({ message: 'Antes de eliminar el ambiente, debe eliminar los productos asociados.' });
            }
        }

    });
}

function uploadImage(req, res) {
    var id = req.params.id;
    var file_name = 'Imagen no Subida...';

    //Esta coleccion de files la agrega el modulo de multiparty
    if (req.files) {

        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            
            Ambiente.findByIdAndUpdate(id, { $push: { fotos: file_name } }, (err, ambienteUpdated) => {
                if (!ambienteUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el ambiente' });
                } else {
                    res.status(200).send({ ambiente: ambienteUpdated });
                }
            });

        } else {
            res.status(200).send({ message: 'Extension del archivo invalida.' })
        }


    } else {
        res.status(200).send({ message: 'No se ha encontrado ninguna imagen.' });
    }

}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/ambiente/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe la imagen' });
        }

    });
}


module.exports = {
    getAmbientes,
    getAmbiente,
    saveAmbiente,
    deleteAmbiente,
    updateAmbiente,
    uploadImage,
    getImageFile,
    getAmbientesByColeccion
};