'use strict';

module.exports = (sequelize, Sequelize) => {
    const LocalDistrict = sequelize.define('localDistrict', {
        local_district_id:{
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
        tableName: 'local_districts',
        createdAt: false,
        updatedAt: false
    });

    return LocalDistrict;
};