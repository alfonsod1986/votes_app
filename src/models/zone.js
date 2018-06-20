'use strict';

module.exports = (sequelize, Sequelize) => {
    const Zone = sequelize.define('zone', {
        zone_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        description:{
            type: Sequelize.STRING(45),
            len: [5,45]
        }
    },
    {
        tableName: 'zones',
        createdAt: false,
        updatedAt: false
    });

    return Zone;
};