'use strict';

module.exports = (sequelize, Sequelize) => {
    const BoxUbiction = sequelize.define('box_ubication', {
        box_ubication_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        description:{
            type: Sequelize.STRING(128),
            len: [1,128]
        }
    },
    {
        tableName: 'box_ubications',
        createdAt: false,
        updatedAt: false
    });

    return BoxUbiction;
};