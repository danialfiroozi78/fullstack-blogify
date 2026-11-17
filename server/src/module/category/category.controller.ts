import type { Request, Response, NextFunction } from "express";
import { getCategoriesService } from "./category.service";

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await getCategoriesService();

    return res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "دسته بندی ها با موفقیت دریافت شدند!",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
