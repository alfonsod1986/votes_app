'use strict';

const User = require('./user');

module.exports = (sequelize, Sequelize) => {
    const SectionBoss = sequelize.define('section_boss', {
        parent:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: User,
                key: 'user_id'
            }
        },
        boss:{
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
                model: User,
                key: 'user_id'
            }
        }
    },
    {
        tableName: 'section_bosses',
        createdAt: false,
        updatedAt: false
    });

    return SectionBoss;
};