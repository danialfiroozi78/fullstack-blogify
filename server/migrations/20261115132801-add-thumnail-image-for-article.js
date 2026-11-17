"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("article", "thumbnail_image", {
      type: Sequelize.STRING(500),
      allowNull: false,
      after: "cover_image",
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn("article", "thumbnail_image");
  },
};
