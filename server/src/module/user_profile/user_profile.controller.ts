import { Request, Response, NextFunction } from "express";
import {
  getUserProfileService,
  updateUserProfileService,
} from "./user_profile.service";
import createHttpError from "http-errors";
import { updateProfileSchema } from "./user_profile.validation";

export const getUserProfileController = async (
  req: Request & { user?: { id: number } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (userId === undefined) {
      res.status(401).json({
        isSuccess: false,
        status: 401,
        message: "توکن معتبر نمی باشد یا منقضی شده است!",
      });
      return;
    }

    const result = await getUserProfileService(userId);

    res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      data: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfileController = async (
  req: Request & { user?: { id: number } },
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (userId === undefined)
      throw createHttpError(401, "کاربر یافت نشد! لطفا مجدد لاگین کنید!");

    const data = updateProfileSchema.parse(req.body);
    const profile = await updateUserProfileService(userId, data, req.file);

    res.status(200).json({
      isSuccess: true,
      statusCode: 200,
      message: "پروفایل با موفقیت بروزرسانی شد!",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
