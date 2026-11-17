import { DataTypes } from "@sequelize/core";
import { sequelize } from "../../config/db.config.js";

export const UserModel = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number: {
      type: DataTypes.STRING(11),
      unique: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  { freezeTableName: true, underscored: true },
);
