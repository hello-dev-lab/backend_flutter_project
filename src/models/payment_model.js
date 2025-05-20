const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const Payment = sequelizePromise.define('db_payments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'db_orders',
            key: 'id',
        }
    },
    payment_method: {
        type: DataTypes.ENUM('offline', 'online'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    transaction_id: {
    type: DataTypes.STRING,
  },
}); 

module.exports = Payment