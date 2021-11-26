const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const User = sequelize.define('user',
    {
        user_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATEONLY,
        },
        gender: {
            type: DataTypes.CHAR(1),

        },
        phone: {
            type: DataTypes.STRING(12),
        },
        address: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        district: {
            type: DataTypes.STRING,
        },
        typeAcc: {
            type: DataTypes.STRING(10),
            defaultValue: 'user',
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = User;