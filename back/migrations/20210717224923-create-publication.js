'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Publications', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
            model: 'Users',
            key: 'id'
            }
        },
        content: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        imageUrl: {
            allowNull: true,
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Publications');
    }
};