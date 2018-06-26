'use strict';

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../service/jwt');
const db = require('../config/db.config');
const User = db.users;

const controller = {};

/**
 * Obtener todos los usuarios
 * 
 * @param req
 * @param res
 * 
 * @returns users
 */
controller.all = (req, res) => {
    User.findAll().then(users => {
        res.status(200).send(users);
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Log in
 * 
 * @param req
 * @param res
 * 
 * @returns user
 */
controller.logIn = (req, res) => {
    var {username} = req.body;
    var {password} = req.body;
    var {gettoken} = req.body;

    console.log(password)
    User.findOne({
        where: { 
            username: username,
            password: password }
    }).then(user => {
        if(user){
            if(gettoken){
                // Devolver token
                // Generar token
                return res.status(200).send({
                    token: jwt.createToken(user)
                });
            }else{
                // Devolver datos de usuario
                user.password = undefined;
                return res.status(200).send({ success: true, user});
            }
            
            
        }else{
            return res.status(404).send({ success: false, message: 'El usuario no existe.'});
        }
    }).catch((err) =>{
        res.status(500).send(err);
    });
};

/**
 * Crear usuario
 * 
 * @param req
 * @param res
 * 
 * @returns user
 */
controller.save = (req, res) => {
    var params = req.body;
    console.log(params);
    if(params.username && params.password && params.role_id){
        var user = {};

        user.username = params.username;
        user.password = params.password;
        user.role_id = params.role_id;

        if(params.first_name){
            user.first_name = params.first_name;
        }
        if(params.last_name){
            user.last_name = params.last_name;
        }
        if(params.second_name){
            user.second_name = params.second_name;
        }

        User.create(user).then(user => {		
            res.send(user);
        });
        
    }else{
        res.status(200).send({
            message: 'Envía todos los campos requeridos.'
        });
    }
};

controller.test = (req, res) => {
    var params = req.body;
    // Cifrar password y guardar usuario
    bcrypt.hash(params.password, null, null, (err, hash) => {
        
        res.status(200).send({ pass: hash});
    });
};
/* Export module */
module.exports = controller;