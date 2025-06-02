const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineProductModel = async () => {
    const Sequelize = await sequelizePromise;
    const Product = Sequelize.define("tb_products", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        original_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
     await Sequelize.sync();

    return Product;
};


module.exports = defineProductModel;