const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineOrderDetailModel = async () => {
  const sequelize = await sequelizePromise;

  const OrderDetail = sequelize.define("OrderDetail", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "tb_OrderDetails",
    timestamps: false,
  });

  await sequelize.sync({ alter: true });

  return OrderDetail;
};

module.exports = defineOrderDetailModel;
