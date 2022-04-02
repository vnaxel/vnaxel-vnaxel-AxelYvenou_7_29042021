    'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Comment extends Model {

        static associate(models) {
        models.Comment.belongsTo(models.User, { foreignKey: 'userId' })
        models.Comment.belongsTo(models.Publication, { foreignKey: 'publicationId' })
        }
    }
    Comment.init({
        publicationId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Comment',
    })
    return Comment;
}