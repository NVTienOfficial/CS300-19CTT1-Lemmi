const { DataTypes, Deferrable } = require("sequelize");

const sequelize = require("../config/database");
const Account = require("./account");

const District = require("./district");

const User = sequelize.define('user',
    {
        user_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            references: {
                model: Account,
                key: 'account_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATEONLY,
        },
        gender: {
            type: DataTypes.CHAR(1),
            defaultValue: 'n',
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
        district_id: {
            type: DataTypes.STRING,
            references: {
                model: District,
                key: 'district_id',
                deferrable: Deferrable.INITIALLY_DEFERRED,
            }
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = User;