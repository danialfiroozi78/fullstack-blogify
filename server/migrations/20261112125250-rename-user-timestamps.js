
"use strict";

module.exports = {
  async up(queryInterface) {
    const columns = await queryInterface.describeTable("user");

    if (columns.createdAt && !columns.created_at) {
      await queryInterface.renameColumn(
        "user",
        "createdAt",
        "created_at",
      );
    }

    if (columns.updatedAt && !columns.updated_at) {
      await queryInterface.renameColumn(
        "user",
        "updatedAt",
        "updated_at",
      );
    }
  },

  async down(queryInterface) {
    // No-op: created_at and updated_at are the canonical
    // column names defined by the initial migration.
  },
};

