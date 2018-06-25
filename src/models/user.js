'use strict';

const Zone = require('./zone');
const Role = require('./role');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        user_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: Sequelize.STRING(128),
            allowNull: true,
            defaultValue: null,
            len: [5,128]
        },
        last_name:{
            type: Sequelize.STRING(45),
            len: [5,128]
        },
        second_name:{
            type: Sequelize.STRING(128),
            allowNull: true,
            defaultValue: null,
            len: [5,128]
        },
        username:{
            type: Sequelize.STRING(20),
            unique: true,
            len: [5,20]
        },
        password:{
            type: Sequelize.STRING(70),
            len: [5,20]
        },
        role_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Zone,
                key: 'role_id'
            }
        }
    },
    {
        tableName: 'users',
        createdAt: false,
        updatedAt: false
    });

    return User;
};