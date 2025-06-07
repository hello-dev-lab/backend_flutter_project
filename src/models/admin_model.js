const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineAdminModel = async () => {
  const sequelize = await sequelizePromise;

  const Admin = sequelize.define("Admin", {
    email: {
      type: DataTypes.STRING,
      unique: true,
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

  await Admin.sync();
  return Admin;
};

const adminModelPromise = defineAdminModel();
module.exports = adminModelPromise;
