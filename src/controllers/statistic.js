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
            var description = outer.description;
            
            var flag = false;

            sections.forEach(el => {
                flag = (el.description == description)? true:false
            });
            if(!flag){
                statistics.forEach(inner =>{
                    if(description == inner.description){
                        boxes.push({
                            box_id: parseInt(inner.box_id),
                            description: inner.box_description,
                            total: parseInt(inner.total),
                            total_assists: parseInt(inner.total_assists),
                            percentage_assists: parseFloat(inner.percentage_assists),
                            total_absences: parseInt(inner.total_absences),
                            percentage_absences: parseInt(inner.percentage_absences)
                        });
                    }
                });
                sections.push({
                    section_id: outer.section_id,
                    description: outer.description,
                    boxes: boxes
                });
            }
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
controller.promotersStatistics = (req, res) => {
    var stm = `CALL sp_get_statistics_by_promoters();`;

    db.votes_app.query(stm).then(statistics => {
        res.status(200).send(statistics);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/* Export module */
module.exports = controller;