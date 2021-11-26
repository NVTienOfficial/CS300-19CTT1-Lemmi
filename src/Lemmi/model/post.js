const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Post = sequelize.define('post',
    {
        post_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        star: {
            type: DataTypes.DECIMAL(1, 1),
            allowNull: false,
        },
        upvote: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        downvote: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        nReport: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        owner_id: {
            type: DataTypes.CHAR(11),
        },
        post_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        sum_vote: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Post;