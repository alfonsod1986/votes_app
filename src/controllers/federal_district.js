'use strict';

const db = require('../config/db.config');
const FederalDistrict = db.federal_districts;

const controller = {};

/**
 * Obtener todos los distritos federales
 * 
 * @param req
 * @param res
 * 
 * @returns federal_districts
 */
controller.all = (req, res) => {
    FederalDistrict.findAll().then(federal_districts => {
        res.status(200).send(federal_districts);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un distrito federal por Id
 * 
 * @param req
 * @param res
 * 
 * @returns federal_district
 */
controller.show = (req, res) =>{
    const { federal_district_id } = req.params;

    FederalDistrict.findById(federal_district_id).then(federal_district =>{
        res.status(200).send(federal_district);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;