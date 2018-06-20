'use strict';

module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define('section', {
        section_id:{
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        description:{
            type: Sequelize.STRING(45),
            len: [1,45]
        }
    },
    {
        tableName: 'sections',
        createdAt: false,
        updatedAt: false
    });

    return Section;
};