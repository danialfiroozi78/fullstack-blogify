"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("comment", "comment_ibfk_1");

    await queryInterface.addConstraint("comment", {
      fields: ["article_id"],
      type: "foreign key",
      name: "fk_comment_article",
      references: {
        table: "article",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("comment", "fk_comment_article");

    await queryInterface.addConstraint("comment", {
      fields: ["article_id"],
      type: "foreign key",
      name: "comment_ibfk_1",
      references: {
        table: "article",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  },
};
