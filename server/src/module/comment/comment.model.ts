import { sequelize } from "../../config/db.config";
import { DataTypes } from "@sequelize/core";

export const CommentModel = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    guest_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    guest_email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
  },
);
