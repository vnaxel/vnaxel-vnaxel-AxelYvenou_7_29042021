'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    
    class User extends Model {

        static associate(models) {
        models.User.hasMany(models.Publication,{ onDelete: 'CASCADE', hooks: true } );
        models.User.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true });
        }
    }
    User.init({
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
    })
    return User;
}