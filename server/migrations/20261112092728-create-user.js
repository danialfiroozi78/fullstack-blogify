"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        phone_number: {
          type: Sequelize.STRING(11),
          allowNull: false,
          unique: true,
        },
        first_name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING(100),
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
      { tableName: "user" },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user");
  },
};
