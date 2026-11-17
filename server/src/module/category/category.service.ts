import { CategoryModel } from "./category.model";

export const getCategoriesService = async () => {
  return await CategoryModel.findAll({
    attributes: ["id", "name", "slug"],
    order: [["id", "ASC"]],
    raw: true,
  });
};
