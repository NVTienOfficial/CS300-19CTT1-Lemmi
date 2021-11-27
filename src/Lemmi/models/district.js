const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const District = sequelize.define('district',
    {
        district_id: {
            type: DataTypes.CHAR(10),
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

module.exports = District;