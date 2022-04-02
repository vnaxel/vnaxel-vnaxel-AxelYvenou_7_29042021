    'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    
    class Publication extends Model {

        static associate(models) {
        models.Publication.belongsTo(models.User, {foreignKey:'userId'})
        models.Publication.hasMany(models.Comment)
        }
    }
    Publication.init({
        userId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        imageUrl: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Publication',
    })
    return Publication;
}