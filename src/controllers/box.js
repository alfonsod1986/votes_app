'use strict';

const db = require('../config/db.config');
const Box = db.boxes;

const controller = {};

/**
 * Obtener todas las casillas
 * 
 * @param req
 * @param res
 * 
 * @returns boxes
 */
controller.all = (req, res) => {
    Box.findAll().then(boxes => {
        res.status(200).send(boxes);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener una casilla por Id
 * 
 * @param req
 * @param res
 * 
 * @returns box
 */
controller.show = (req, res) =>{
    const { box_id } = req.params;

    Box.findById(box_id).then(box =>{
        res.status(200).send(box);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;