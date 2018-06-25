'use strict';

const User = require('./user');

module.exports = (sequelize, Sequelize) => {
    const TerritoryBoss = sequelize.define('territory_boss', {
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
        tableName: 'territory_bosses',
        createdAt: false,
        updatedAt: false
    });

    return TerritoryBoss;
};