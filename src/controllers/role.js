'use strict';

const db = require('../config/db.config');
const Role = db.roles;

const controller = {};

/**
 * Obtener todos los roles
 * 
 * @param req
 * @param res
 * 
 * @returns roles
 */
controller.all = (req, res) => {
    Role.findAll().then(roles => {
        res.status(200).send(roles);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un role por Id
 * 
 * @param req
 * @param res
 * 
 * @returns role
 */
controller.show = (req, res) =>{
    const { role_id } = req.params;

    Role.findById(zone_id).then(role =>{
        res.status(200).send(role);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;