'use strict';

module.exports = (sequelize, Sequelize) => {
    const SectionType = sequelize.define('section_type', {
        section_type_id:{
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
        tableName: 'section_types',
        createdAt: false,
        updatedAt: false
    });

    return SectionType;
};