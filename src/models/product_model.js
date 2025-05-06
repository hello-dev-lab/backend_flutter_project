const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineProductModel = async () => {
    const Sequelize = await sequelizePromise;
    const Product = Sequelize.define("db_products", {
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
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        review_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.TEXt,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Product;
};


module.exports = defineProductModel;