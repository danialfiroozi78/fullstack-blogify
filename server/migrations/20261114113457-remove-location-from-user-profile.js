"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn("user_profile", "location");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_profile", "location", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },
};
