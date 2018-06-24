'use strict';

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('role', {
        role_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        description:{
            type: Sequelize.STRING(60),
            len: [5,45]
        }
    },
    {
        tableName: 'roles',
        createdAt: false,
        updatedAt: false
    });

    return Role;
};