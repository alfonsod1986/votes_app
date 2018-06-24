'use strict';

const db = require('../config/db.config');
const Voter = db.voters;
const Seq = db.Sequelize;

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
    Voter.findAll().then(voters => {
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
 * Obtener un votante por internal 9d
 * 
 * @param req
 * @param res
 * 
 * @returns voter
 */
controller.getByInternalId = (req, res) =>{
    const { internal_id } = req.params;

    Voter.findAll({
        where:{ voter_id: internal_id}
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
 * Obtener un votante por filtro
 * 
 * @param req
 * @param res
 * 
 * @returns voters
 */
controller.search = (req, res) => {
    var {param} = req.query;
    param = param == null? '':param;
    console.log(param)
    Voter.findAll({
        where: {
            [db.Sequelize.or]:[
                db.Sequelize.where(
                    db.Sequelize.fn(
                        db.Sequelize.col('first_name'),
                        db.Sequelize.col('last_name'),
                        db.Sequelize.col('second_name'),{
                            [db.Sequelize.Op.like]: `%${param}%`
                        })
                )
            ]
        }
    }).then(voters => {
        res.status(200).send(voters);
    }).catch((err) =>{
        res.status(500).send(err);
    });
}
/* Export module */
module.exports = controller;