const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Tag = sequelize.define('tag',
    {
        tag_id: {
            type: DataTypes.CHAR(3),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Tag;