const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");

const Account = sequelize.define('account',
    {
        account_id: {
            type: DataTypes.CHAR(5),
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(10),
            defaultValue: "user",
            validate: {
                isIn: [['admin', 'user', 'owner']],
            },
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Account;