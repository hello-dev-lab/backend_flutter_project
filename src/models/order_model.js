const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineOrderModel = async () => {
    const sequelize = await sequelizePromise;

    const Order = sequelize.define("db_orders", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
       province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        village: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "pending",
        }
    });

    await sequelize.sync({ force: false, alter: true });
    console.log(" Order table has been successfully created");

    return Order;
};

module.exports = defineOrderModel;