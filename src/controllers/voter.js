'use strict';

const db = require('../config/db.config');
const Voter = db.voters;

const controller = {};

/**
 * Obtener todos los votantes
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */
controller.all = (req, res) => {
    var params = req.query;

    var user_id = parseInt(params.user_id);
    var role_id = parseInt(params.role_id);

    var stm = `SELECT v.voter_id, IF(v.electoral_key != '', v.electoral_key, 'SIN CLAVE ELECTORAL') AS electoral_key, 
    v.internal_id, v.first_name, v.last_name, v.second_name,
    CONCAT(v.first_name, ' ', v.last_name, ' ', v.second_name) AS fullname,
    v.attended, v.address, v.external_number, v.internal_number,
    v.neigborhood, v.zipcode, s.description AS section_name,
    IF(v.address != '',
        CONCAT(v.address, ' ', v.external_number, 
        IF(v.internal_number != '', CONCAT(' ', v.internal_number), ''), ' ', v.neigborhood, ' ', v.zipcode), 'SIN DIRECCION'
    ) AS fulladdress
    FROM voters v
    INNER JOIN boxes b ON v.box_id = b.box_id
    INNER JOIN sections s ON b.section_id = s.section_id `;

    switch(role_id){
        /* Estratificación por jefe de zona */
        case 2:
            stm += `WHERE s.zone_id = (SELECT zone_id FROM zone_bosses WHERE boss = ${user_id}) `;
        break;
        /* Estratificación por jefe sección */
        case 3:
            if(user_id == 160 || user_id == 171 || user_id == 182){
                stm += `WHERE s.section_id = 11 `;
            }else{
                stm += `WHERE s.section_id = (SELECT section_id FROM section_bosses WHERE boss = ${user_id}) `;
            }
        break;
        /* Estratificación por jefe territorial */
        case 4:
            stm = `SELECT v.voter_id, IF(v.electoral_key != '', v.electoral_key, 'SIN CLAVE ELECTORAL') AS electoral_key,
            v.internal_id, v.first_name, v.last_name, v.second_name,
            CONCAT(v.first_name, ' ', v.last_name, ' ', v.second_name) AS fullname,
            v.attended, v.address, v.external_number, v.internal_number,
            v.neigborhood, v.zipcode, s.description AS section_name,
            IF(v.address != '',
                CONCAT(v.address, ' ', v.external_number, 
                IF(v.internal_number != '', CONCAT(' ', v.internal_number), ''), ' ', v.neigborhood, ' ', v.zipcode), 'SIN DIRECCION'
            ) AS fulladdress
            FROM user_voter uv
            INNER JOIN voters v ON uv.voter_id = v.voter_id
            INNER JOIN boxes b ON v.box_id = b.box_id
            INNER JOIN sections s ON b.section_id = s.section_id
            WHERE uv.user_id IN (SELECT boss FROM promoters WHERE parent = ${user_id}) `;
        break;

        /* Estratificación por promotor */
        case 5:
            stm = `SELECT v.voter_id, IF(v.electoral_key != '', v.electoral_key, 'SIN CLAVE ELECTORAL') AS electoral_key,
            v.internal_id, v.first_name, v.last_name, v.second_name,
            CONCAT(v.first_name, ' ', v.last_name, ' ', v.second_name) AS fullname,
            v.attended, v.address, v.external_number, v.internal_number,
            v.neigborhood, v.zipcode, s.description AS section_name,
            IF(v.address != '',
                CONCAT(v.address, ' ', v.external_number, 
                IF(v.internal_number != '', CONCAT(' ', v.internal_number), ''), ' ', v.neigborhood, ' ', v.zipcode), 'SIN DIRECCION'
            ) AS fulladdress
            FROM user_voter uv
            INNER JOIN voters v ON uv.voter_id = v.voter_id
            INNER JOIN boxes b ON v.box_id = b.box_id
            INNER JOIN sections s ON b.section_id = s.section_id
            WHERE uv.user_id = ${user_id} `;
        break;
    }

    stm += 'ORDER BY v.voter_id;'
    
    db.votes_app.query(stm, { type: db.Sequelize.QueryTypes.SELECT}).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por Id
 * 
 * @param req
 * @param res
 * 
 * @returns voter
 */
controller.show = (req, res) =>{
    const { voter_id } = req.params;

    Voter.findById(voter_id).then(voter => {
        res.status(200).send(voter);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por internal id
 * 
 * @param req
 * @param res
 * 
 * @returns voter
 */
controller.getByInternalId = (req, res) =>{
    const { internal_id } = req.params;

    Voter.findAll({
        where:{ internal_id: internal_id}
    }).then(voter => {
        res.status(200).send(voter);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por clave electoral
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */
controller.getByElectoralKey = (req, res) => {
    const {electoral_key}  = req.body;
    Voter.findAll({
        where: { 
            electoral_key: {
            [db.Sequelize.Op.like]: `%${electoral_key}%`} 
        }
    }).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por zona
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */
controller.getByZone = (req, res) => {
    const data  = req.body;

    var stm = `CALL sp_get_voters_by_zone(:zone_id);`;

    db.votes_app.query(stm, {replacements: data}).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por sección
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */

controller.getBySection = (req, res) => {
    const data  = req.body;

    var stm = `CALL sp_get_voters_by_section(:section_id);`;

    db.votes_app.query(stm, {replacements: data}).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por casilla
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */
controller.getByBox = (req, res) => {
    const data  = req.body;

    var stm = `CALL sp_get_voters_by_box(:box_id);`;

    db.votes_app.query(stm, {replacements: data}).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por promotor
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */
controller.getByPromoter = (req, res) => {
    const data  = req.body;

    var stm = `CALL sp_get_voters_by_promoter(:promoter_id);`;

    db.votes_app.query(stm, {replacements: data}).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Obtener un votante por filtro
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */
controller.search = (req, res) => {
    var params = req.query;
    var search_param = params.search == null? '':params.search;
    
     
    console.log(params)

    var stm = `SELECT v.* FROM voters v
    INNER JOIN boxes b ON v.box_id = b.box_id
    INNER JOIN sections s ON b.section_id = s.section_id
    WHERE CONCAT(v.first_name,' ',v.last_name,' ',v.second_name) LIKE '%${search_param}%' 
    ORDER BY v.voter_id;`;

    db.votes_app.query(stm, { type: db.Sequelize.QueryTypes.SELECT}).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
}

/**
 * Actualizar estado de asistencia
 * 
 * @param req
 * @param res
 * 
 * @returns
 */
controller.attended = (req, res) =>{
    const { voter_id } = req.params;
    const { attended } = req.body;

    Voter.update({ attended: attended }, { where:{ voter_id: voter_id } }).then(() => {
        res.status(200).send({success: true});
    }).catch((err) =>{
        res.status(500).send(err);
    });
};
/* Export module */
module.exports = controller;