'use strict';

module.exports = (sequelize, Sequelize) => {
    const FederalDistrict = sequelize.define('federal_district', {
        federal_district_id:{
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
        tableName: 'federal_districts',
        createdAt: false,
        updatedAt: false
    });

    return FederalDistrict;
};