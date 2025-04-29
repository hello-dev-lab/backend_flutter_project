const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineAdminModel = async () => {
  const sequelize = await sequelizePromise;

  const Admin = sequelize.define("db_users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  await sequelize.sync({ force: false, alter: true });
  console.log("Admin model synchronized.");

  return Admin;
};

const adminModelPromise = defineAdminModel();

module.exports = adminModelPromise;
