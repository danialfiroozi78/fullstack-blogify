"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("comment", "comment_ibfk_2");

    await queryInterface.changeColumn("comment", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addConstraint("comment", {
      fields: ["user_id"],
      type: "foreign key",
      name: "comment_ibfk_2",
      references: {
        table: "user",
        field: "id",
      },
    });

    await queryInterface.addColumn("comment", "guest_name", {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
    });

    await queryInterface.addColumn("comment", "guest_email", {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("comment", "guest_name");
    await queryInterface.removeColumn("comment", "guest_email");

    await queryInterface.removeConstraint("comment", "comment_ibfk_2");

    await queryInterface.changeColumn("comment", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addConstraint("comment", {
      fields: ["user_id"],
      type: "foreign key",
      name: "comment_ibfk_2",
      references: {
        table: "user",
        field: "id",
      },
    });
  },
};
