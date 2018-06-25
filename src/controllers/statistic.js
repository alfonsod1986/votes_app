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
    var stm = `SELECT s.section_id,s.description,COUNT(v.voter_id) AS total, 
    SUM(IF(v.attended = 1, 1, 0)) AS total_assists,
    ROUND((SUM(IF(v.attended  = 1, 1 , 0 )))*100 /COUNT(v.voter_id), 1 ) AS percentage_assists,
    SUM(IF(v.attended = 0, 1, 0)) AS total_absences,
    ROUND((SUM(IF(v.attended  = 0, 1 , 0 )))*100 /COUNT(v.voter_id), 1 ) AS percentage_absences
    FROM voters v
    INNER JOIN boxes b ON v.box_id = b.box_id
    INNER JOIN sections s ON b.section_id = s.section_id
    GROUP BY s.description
    ORDER BY s.section_id;`;

    db.votes_app.query(stm).then(statistics => {
        res.status(200).send(statistics);
    }).catch((err) =>{
        res.status(500).send(err);
    });
}

controller.boxesStatistics = (req, res) => {
    const {section_id} = req.query;

    var stm = `SELECT 
    b.box_id,
    CONCAT('CASILLA ', b.box_id, ' - ', b.type, ' - ', bu.description) AS description,
    COUNT(v.voter_id) AS total, 
    SUM(IF(v.attended = 1, 1, 0)) AS total_assists,
    ROUND((SUM(IF(v.attended  = 1, 1 , 0 )))*100 /COUNT(v.voter_id), 1 ) AS percentage_assists,
    SUM(IF(v.attended = 0, 1, 0)) AS total_absences,
    ROUND((SUM(IF(v.attended  = 0, 1 , 0 )))*100 /COUNT(v.voter_id), 1 ) AS percentage_absences
    FROM voters v
    INNER JOIN boxes b ON v.box_id = b.box_id
    INNER JOIN sections s ON b.section_id = s.section_id
    INNER JOIN box_ubications bu ON b.box_ubication_id = bu.box_ubication_id
    WHERE b.section_id = ${section_id}
    GROUP BY CONCAT('CASILLA ', b.box_id, ' - ', b.type, ' - ', bu.description)
    ORDER BY b.box_id;`;

    db.votes_app.query(stm).then(statistics => {
        res.status(200).send(statistics);
    }).catch((err) =>{
        res.status(500).send(err);
    });
}

/* Export module */
module.exports = controller;