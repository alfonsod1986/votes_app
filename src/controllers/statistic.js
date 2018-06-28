'use strict';

const db = require('../config/db.config');

const controller = {};

/**
 * Obtener estadística de las secciones
 * 
 * @param req
 * @param res
 * 
 * @returns statistics
 */
controller.sectionsStatistics = (req, res) => {
    var stm = `CALL sp_get_statistics_by_sections();`;

    db.votes_app.query(stm).then(statistics => {
        res.status(200).send(statistics);
    }).catch((err) =>{
        res.status(500).send(err);
    });
}

/**
 * Obtener estadística de las casillas
 * 
 * @param req
 * @param res
 * 
 * @returns statistics
 */
controller.boxesStatistics = (req, res) => {
    var stm = `CALL sp_get_statistics_by_boxes();`;

    db.votes_app.query(stm).then(statistics => {

        var sections = [];

        statistics.forEach(outer => {
            var boxes = [];
            var section_id = outer.section_id;

            statistics.forEach(inner =>{
                if(section_id == inner.section_id){
                    boxes.push({
                        description: inner.box_description,
                        total: inner.total,
                        total_assists: inner.total_assists,
                        percentage_assists: inner.percentage_assists,
                        total_absences: inner.total_absences,
                        percentage_absences: inner.percentage_absences
                    });
                }
            });
            sections.push({
                description: outer.description,
                boxes: boxes
            });
        });
        res.status(200).send(sections);
    }).catch((err) =>{
        res.status(500).send(err);
    });
}

/**
 * Obtener estadística de las zonas
 * 
 * @param req
 * @param res
 * 
 * @returns statistics
 */
controller.zonesStatistics = (req, res) => {
    var stm = `CALL sp_get_statistics_by_zones();`;
    
    db.votes_app.query(stm).then(statistics => {
        res.status(200).send(statistics);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener estadística de los usuarios
 * 
 * @param req
 * @param res
 * 
 * @returns statistics
 */
controller.usersStatistics = (req, res) => {
    var stm = ``;

    db.votes_app.query(stm).then(statistics => {
        res.status(200).send(statistics);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;