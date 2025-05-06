const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineImageModel = async () => {
    const sequelize = await sequelizePromise;

    const Image = sequelize.define("db_images", {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    await sequelize.sync({ force: false, alter: true });
    console.log(" Image table has been successfully created");

    return Image;
};

module.exports = defineImageModel;