const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineCategoryModel = async () => {
  const sequelize = await sequelizePromise;

  const Category = sequelize.define("tb_categories", {
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
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updateBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  await Category.sync( { alter: true });

 return Category;
};

const categories = defineCategoryModel();

module.exports = categories;
