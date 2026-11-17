import { DataTypes } from "@sequelize/core";
import { sequelize } from "../../config/db.config.js";

export const OtpModel = sequelize.define(
  "otp",
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
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { freezeTableName: true, underscored: true },
);
