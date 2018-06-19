'use strict';
const Gender = require('./gender');
const Occupation = require('./occupation');
const Neighborhood = require('./neighborhood');

module.exports = (sequelize, Sequelize) => {
    const Voter = sequelize.define('voter', {
        voter_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        electoral_key:{
            type: Sequelize.STRING(20),
            allowNull: true,
            len: [18,20]  
        },
        first_name:{
            type: Sequelize.STRING(128),
            len: [5,128]
        },
        last_name:{
            type: Sequelize.STRING(45),
            len: [5,128]
        },
        second_name:{
            type: Sequelize.STRING(128),
            allowNull: true,
            len: [5,128]
        },
        state:{
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        on_nominal_list:{
            type: Sequelize.BOOLEAN
        },
        address:{
            type: Sequelize.STRING(40),
            allowNull: true,
            len: [2,40]
        },
        external_number:{
            type: Sequelize.STRING(10),
            allowNull: true,
            len: [2,10]
        },
        internal_number:{
            type: Sequelize.STRING(10),
            allowNull: true,
            len: [2,10]
        },
        gender_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Gender,
                key: 'gender_id'
            }
        },
        occupation_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Occupation,
                key: 'occupation_id'
            }
        },
        neighborhood_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Neighborhood,
                key: 'neighborhood_id'
            }
        }
    },
    {
        tableName: 'voters',
        createdAt: false,
        updatedAt: false
    });

    return Voter;
};