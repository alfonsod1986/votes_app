'use strict';

const db = require('../config/db.config');
const BoxUbication = db.box_ubications;

const controller = {};

/**
 * Obtener todas ubicaciones de las casillas
 * 
 * @param req
 * @param res
 * 
 * @returns box_ubications
 */
controller.all = (req, res) => {
    BoxUbication.findAll().then(box_ubications => {
        res.status(200).send(box_ubications);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener una ubicación de casilla por Id
 * 
 * @param req
 * @param res
 * 
 * @returns box_ubication
 */
controller.show = (req, res) =>{
    const { box_ubication_id } = req.params;

    BoxUbication.findById(box_ubication_id).then(box_ubication =>{
        res.status(200).send(box_ubication);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;