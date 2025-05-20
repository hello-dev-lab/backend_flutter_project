const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineAdminModel = async () => {
  const sequelize = await sequelizePromise;

  const User = sequelize.define("db_users", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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

  await sequelize.sync();

  console.log(" User table has been successfully created");

  return User;
};

const adminModelPromise = defineAdminModel();

module.exports = adminModelPromise;
