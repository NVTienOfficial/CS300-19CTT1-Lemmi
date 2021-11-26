const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Supplier = sequelize.define('supplier',
    {
        supplier_id: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATEONLY,
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
            defaultValue: 'supplier',
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Supplier;