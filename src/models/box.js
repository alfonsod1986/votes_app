'use strict';

const Section = require('./section');
const SectionType = require('./section_type');
const BoxUbication = require('./box_ubication');

module.exports = (sequelize, Sequelize) => {
    const Box = sequelize.define('box', {
        box_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        code:{
            type: Sequelize.STRING(10),
            len: [1,10]
        },
        section_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Section,
                key: 'section_id'
            }
        },
        section_type_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: SectionType,
                key: 'section_type_id'
            }
        },
        type:{
            type: Sequelize.ENUM('URBANA', 'NO URBANA')
        },
        box_ubication_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: BoxUbication,
                key: 'box_ubication_id'
            }
        },
    },
    {
        tableName: 'boxes',
        createdAt: false,
        updatedAt: false
    });

    return Box;
};