const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineAdminModel = async () => {
  const sequelize = await sequelizePromise;

  const Admin = sequelize.define("Admin", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "Admins",
    timestamps: true,
  });

  await Admin.sync({ alter: true });

  return Admin;

};

const adminModelPromise = defineAdminModel();
module.exports = adminModelPromise;
