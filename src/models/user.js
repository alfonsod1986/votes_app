'use strict';

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        user_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: Sequelize.STRING(20),
            unique: true,
            len: [5,20]
        },
        password:{
            type: Sequelize.STRING(70),
            len: [5,20]
        }
    },
    {
        tableName: 'users',
        createdAt: false,
        updatedAt: false
    });

    return User;
};