"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn("user", "createdAt", "created_at");

    await queryInterface.renameColumn("user", "updatedAt", "updated_at");
  },

  async down(queryInterface) {
    await queryInterface.renameColumn("user", "created_at", "createdAt");

    await queryInterface.renameColumn("user", "updated_at", "updatedAt");
  },
};
