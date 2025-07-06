const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const createDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
  );
  await connection.end();
};

const initializeSequelize = async () => {
  await createDatabase();

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.HOST,
      dialect: "mysql",
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }

  return sequelize;
};

const sequelizeInstance = initializeSequelize();

module.exports = sequelizeInstance;
