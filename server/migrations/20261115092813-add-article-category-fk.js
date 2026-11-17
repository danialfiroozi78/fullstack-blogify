"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("article", {
      fields: ["category_id"],
      type: "foreign key",
      name: "fk_articles_category_id",
      references: {
        table: "category",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("article", "fk_articles_category_id");
  },
};
