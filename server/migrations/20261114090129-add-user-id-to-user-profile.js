"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_profile", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,

      unique: true,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      after: "id",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("user_profile", "user_id");
  },
};
