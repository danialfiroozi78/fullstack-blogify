"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_profile", "bio", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn("user_profile", "website", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn("user_profile", "avatar", {
      type: Sequelize.STRING(500),
      allowNull: true,
      default: null,
    });
    await queryInterface.addColumn("user_profile", "location", {
      type: Sequelize.STRING(255),
      allowNull: true,
    });
    await queryInterface.addColumn("user_profile", "birth_date", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("user_profile", "bio");
    await queryInterface.removeColumn("user_profile", "website");
    await queryInterface.removeColumn("user_profile", "location");
    await queryInterface.removeColumn("user_profile", "birth_date");
    await queryInterface.removeColumn("user_profile", "avatar");
  },
};
