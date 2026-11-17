"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "otp",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        phone_number: {
          type: Sequelize.STRING(11),
          unique: true,
          allowNull: false,
        },
        code: {
          type: Sequelize.STRING(6),
          allowNull: false,
        },
        expires_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { tableName: "otp" },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("otp");
  },
};
