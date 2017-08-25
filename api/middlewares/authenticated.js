'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clav3*secret4-b0rzom1';

exports.ensureAuth = function (req, res, next) {
    //Aca evaluo si viene el header autorizathion (donde va a venir el token de jwt)
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticacion' });
    }

    //Reemplazo en el token las comillas (vienen en el request)
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        //Decodifico el payload de jwt con la clave secreta
        var payload = jwt.decode(token, secret);

        //Verifico que no haya expirado
        if (payload.exp <= moment.unix()) {
            return res.status(401).send({ message: 'El Token ha expirado.' });
        }


    } catch (ex) {

        return res.status(404).send({ message: 'Token invalido.' });
    }
    //Agrego al request el objeto user (el payload tiene todos los datos)
    req.user = payload;

    next();
};