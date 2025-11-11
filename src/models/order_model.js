const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineOrderModel = async () => {
  const sequelize = await sequelizePromise;

  const Order = sequelize.define("Order", {
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Transportation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  }, {
    tableName: "orders",
    timestamps: false 
  });

  await sequelize.sync({ alter: true });
  return Order;

};

module.exports = defineOrderModel;
