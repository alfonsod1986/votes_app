'use strict';

const Zone = require('./zone');

module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define('section', {
        section_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        description:{
            type: Sequelize.STRING(45),
            len: [1,45]
        },
        zone_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: Zone,
                key: 'zone_id'
            }
        },
    },
    {
        tableName: 'sections',
        createdAt: false,
        updatedAt: false
    });

    return Section;
};