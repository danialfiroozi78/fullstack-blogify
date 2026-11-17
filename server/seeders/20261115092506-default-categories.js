"use strict";

const categories = [
  { name: "برنامه‌نویسی", slug: "programming" },
  { name: "هوش مصنوعی", slug: "artificial-intelligence" },
  { name: "تکنولوژی", slug: "technology" },
  { name: "طراحی وب", slug: "web-design" },
  { name: "امنیت سایبری", slug: "cybersecurity" },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "category",
      categories.map((category) => ({
        ...category,
        created_at: new Date(),
        updated_at: new Date(),
      })),
      {
        updateOnDuplicate: ["name", "updated_at"],
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("category", {
      slug: categories.map((category) => category.slug),
    });
  },
};
