'use strict';

const db = require('../config/db.config');
const LocalDistrict = db.local_districts;

const controller = {};

/**
 * Obtener todos los distritos locales
 * 
 * @param req
 * @param res
 * 
 * @returns local_districts
 */
controller.all = (req, res) => {
    LocalDistrict.findAll().then(local_districts => {
        res.status(200).send(local_districts);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un distrito local por Id
 * 
 * @param req
 * @param res
 * 
 * @returns local_district
 */
controller.show = (req, res) =>{
    const { local_district_id } = req.params;

    LocalDistrict.findById(local_district_id).then(local_district =>{
        res.status(200).send(local_district);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;