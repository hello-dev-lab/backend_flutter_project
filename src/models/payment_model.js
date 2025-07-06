const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const definePaymentModel = async () => {
    const sequelize = await sequelizePromise;
    const Payment = sequelize.define("Payment", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: "tb_payments",
        timestamps: false
    });

    await Payment.sync({ alter: true });

    return Payment;
}

module.exports = definePaymentModel;