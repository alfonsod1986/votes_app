'use strict';

module.exports = (sequelize, Sequelize) => {
    const Occupation = sequelize.define('occupation', {
        occupation_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        description:{
            type: Sequelize.STRING(70),
            len: [5,70]
        }
    },
    {
        tableName: 'occupations',
        createdAt: false,
        updatedAt: false
    });

    return Occupation;
};