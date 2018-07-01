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
    var stm = `SELECT s.section_id, s.description, 
    z.description AS zone_name FROM sections s
    INNER JOIN zones z ON s.zone_id = z.zone_id;
    WHERE s.section <= 20`;

    db.votes_app.query(stm, { type: db.Sequelize.QueryTypes.SELECT}).then(voters => {
        res.status(200).send(voters);
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

    var stm = `SELECT s.section_id, s.description, 
    z.description AS zone_name FROM sections s
    INNER JOIN zones z ON s.zone_id = z.zone_id 
    WHERE s.section_id = ${section_id};`;

    db.votes_app.query(stm, { type: db.Sequelize.QueryTypes.SELECT}).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;