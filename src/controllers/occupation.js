'use strict';

const db = require('../config/db.config');
const Occupation = db.occupations;

const controller = {};

/**
 * Obtener todas ocupaciones
 * 
 * @param req
 * @param res
 * 
 * @returns occupations
 */
controller.all = (req, res) => {
    Occupation.findAll().then(occupations => {
        res.status(200).send(occupations);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener una ocupación por Id
 * 
 * @param req
 * @param res
 * 
 * @returns occupation
 */
controller.show = (req, res) =>{
    const { occupation_id } = req.params;

    Occupation.findById(occupation_id).then(occupation =>{
        res.status(200).send(occupation);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;