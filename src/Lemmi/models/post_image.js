const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Image = require("./image");
const Post = require("./post");

const PostImage = sequelize.define('post_image',
    {
        image_id: {
            type: DataTypes.CHAR(8),
            primaryKey: true,
        },
        post_id: {
            type: DataTypes.CHAR(8),
            primaryKey: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = PostImage;