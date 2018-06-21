'use strict';

const FederalDistrict = require('./federal_district');
const LocalDistrcit = require('./local_district');
const Box = require('./box');
const Occupation = require('./occupation');

module.exports = (sequelize, Sequelize) => {
    const Voter = sequelize.define('voter', {
        voter_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        internal_id:{
            type: Sequelize.INTEGER
        },
        electoral_key:{
            type: Sequelize.STRING(20),
            allowNull: true,
            defaultValue: null,
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
            defaultValue: null,
            len: [5,128]
        },
        state:{
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        federal_district_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: FederalDistrict,
                key: 'federal_district_id'
            }
        },
        local_district_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: LocalDistrcit,
                key: 'box_id'
            }
        },
        city:{
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        box_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Box,
                key: 'box_id'
            }
        },
        section_4d_16:{
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null,
            len: [5,10]
        },
        on_nominal_list:{
            type: Sequelize.BOOLEAN
        },
        occupation_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Occupation,
                key: 'occupation_id'
            }
        },
        address:{
            type: Sequelize.STRING(40),
            allowNull: true,
            defaultValue: null,
            len: [2,40]
        },
        external_number:{
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null,
            len: [2,10]
        },
        internal_number:{
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null,
            len: [2,10]
        },
        neigborhood:{
            type: Sequelize.STRING(255),
            allowNull: true,
            defaultValue: null,
            len: [2,255]
        },
        zipcode:{
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null,
            len: [2,10]
        },
        residence_time:{
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null,
            len: [2,10]
        },
        locality:{
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null,
            len: [2,10]
        },
        apple:{
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: null,
            len: [2,10]
        },
        registration_date:{
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null
        },
        attended:{
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: 0
        }
    },
    {
        tableName: 'voters',
        createdAt: false,
        updatedAt: false
    });

    return Voter;
};