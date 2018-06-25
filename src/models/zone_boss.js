'use strict';

const User = require('./user');

module.exports = (sequelize, Sequelize) => {
    const ZoneBoss = sequelize.define('zone_boss', {
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
        tableName: 'zone_bosses',
        createdAt: false,
        updatedAt: false
    });

    return ZoneBoss;
};