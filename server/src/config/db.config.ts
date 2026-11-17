import "dotenv/config";
import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

export const sequelize = new Sequelize({
  dialect: MySqlDialect,
  logging: false,
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL has been connected! ✅");
  } catch (error) {
    console.error("MySQL connection failed: ⛔", error);
    throw error;
  }
};
