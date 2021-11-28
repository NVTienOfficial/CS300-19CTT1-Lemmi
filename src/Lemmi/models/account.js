const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");

const User = require("./user");

const Account = sequelize.define('account',
    {
        user_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            references: {
                model: User,
                key: 'user_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(10),
            defaultValue: "user",
            allowNull: false,
            validate: {
                isIn: [['admin', 'user', 'supplier']],
            },
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Account;