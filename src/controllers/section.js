'use strict';

const db = require('../config/db.config');
const Section = db.sections;

const controller = {};

/**
 * Obtener todas secciones
 * 
 * @param req
 * @param res
 * 
 * @returns sections
 */
controller.all = (req, res) => {
    Section.findAll({
        include: [{
            model: db.zones,
            as: 'only_zone',
            attributes: ['description']
        }]
    }).then(sections => {
        res.status(200).send(sections);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener una sección por Id
 * 
 * @param req
 * @param res
 * 
 * @returns section
 */
controller.show = (req, res) =>{
    const { section_id } = req.params;

    Section.findById(section_id).then(section =>{
        res.status(200).send(section);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;