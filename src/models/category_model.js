const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineCategoryModel = async () => {
  const sequelize = await sequelizePromise;

  const Category = sequelize.define("db_categories", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  await sequelize.sync();

  console.log(" User table has been successfully created");

  return Category;
};

const categories = defineCategoryModel();

module.exports = categories;
