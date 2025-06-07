const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineUserModel = async () => {
  const sequelize = await sequelizePromise;

  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      // unique: true,
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
  }, {
     tableName: "Users",
    timestamps: true,
  });

  await User.sync({ alter: true }); 

  console.log("User table has been successfully created or updated");

  return User;
};

const userModelPromise = defineUserModel();

module.exports = userModelPromise;
