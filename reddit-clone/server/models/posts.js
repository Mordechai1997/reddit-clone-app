const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('posts', {
    postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    postedBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false

    },
    Cvote: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ccomment: {
        type: DataTypes.INTEGER,
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



module.exports = Post;