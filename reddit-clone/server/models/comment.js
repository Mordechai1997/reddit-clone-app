const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define('comments', {
    commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    postedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Ccomment: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idPost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idParent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        get: function () { // or use get(){ }
            return this.getDataValue('createdAt')
                .toLocaleString('en-GB', { timeZone: 'UTC' });
        }
    }


})



module.exports = Comment;