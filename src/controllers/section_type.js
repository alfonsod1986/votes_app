'use strict';

const db = require('../config/db.config');
const SectionType = db.section_types;

const controller = {};

/**
 * Obtener todos los tipos secciones
 * 
 * @param req
 * @param res
 * 
 * @returns section_types
 */
controller.all = (req, res) => {
    SectionType.findAll().then(section_types => {
        res.status(200).send(section_types);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un tipo de sección por Id
 * 
 * @param req
 * @param res
 * 
 * @returns section_type
 */
controller.show = (req, res) =>{
    const { section_type_id } = req.params;

    SectionType.findById(section_type_id).then(section_type =>{
        res.status(200).send(section_type);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;