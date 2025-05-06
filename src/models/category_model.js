const { DataTypes } = require("sequelize");
const sequelizePromise = require("../config/db");

const defineImageModel = async () => {
    const sequelize = await sequelizePromise;

    const Image = sequelize.define("db_images", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    await sequelize.sync({ force: false, alter: true });
    console.log(" Image table has been successfully created");

    return Image;
};

module.exports = defineImageModel;