'use strict';

const User = require('./user');

module.exports = (sequelize, Sequelize) => {
    const Promoter = sequelize.define('promoter', {
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
        tableName: 'promoters',
        createdAt: false,
        updatedAt: false
    });

    return Promoter;
};