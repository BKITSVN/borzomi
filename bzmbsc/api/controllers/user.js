'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');



function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    user.nombre = params.nombre;
    user.apellido= params.apellido;
    user.email = params.email;
    user.role = params.role;
    user.direccion = params.direccion;
    user.telefono = params.telefono;

    if (params.password) {
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;

            if (user.nombre != null && user.apellido != null && user.email != null) {
                //Save To DB
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            }
            else {
                res.status(200).send({ message: 'Faltan completar campos' });
            }

        });
    } else {
        res.status(200).send({ message: 'Ingrese contrasena' });
    }
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    
    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tiene permisos para actualizar el usuario' });
    }
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            } else {
                     res.status(200).send({ user: userUpdated });
            }
        }
    });
}


function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion loginUser' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'Usuario Inexistente' });
            } else {
                //Comprobar contrasena
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        //user OK
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: 'Contrasena incorrecta' });
                    }
                })
            }
        }

    });

}


module.exports = {
    loginUser,
    saveUser,
    updateUser
};