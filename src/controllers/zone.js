'use strict';

const db = require('../config/db.config');
const Zone = db.zones;

const controller = {};

/**
 * Obtener todas las zonas
 * 
 * @param req
 * @param res
 * 
 * @returns zones
 */
controller.all = (req, res) => {
    Zone.findAll().then(zones => {
        res.status(200).send(zones);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener una zona por Id
 * 
 * @param req
 * @param res
 * 
 * @returns zone
 */
controller.show = (req, res) =>{
    const { zone_id } = req.params;

    Zone.findById(zone_id).then(zone =>{
        res.status(200).send(zone);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;