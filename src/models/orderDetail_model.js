const { DataTypes, or } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineImageModel = async () => {
    const sequelize = await sequelizePromise;

    const Image = sequelize.define("db_images", {
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
            defaultValue: 1
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

    await sequelize.sync({ force: false, alter: true });
    console.log(" Image table has been successfully created");

    return Image;
};

module.exports = defineImageModel;