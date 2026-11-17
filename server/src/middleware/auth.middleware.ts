import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request & {
    user?: {
      id: number;
    };
  },
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.access_token;

    if (!token)
      throw createHttpError(401, "توکن منقضی شده! لطفا مجدد لاگین کنید!");

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "string" || typeof decoded.userId !== "number") {
      return res.status(401).json({
        isSuccess: false,
        statusCode: 401,
        message: "توکن منقضی شده یا معتبر نمی باشد!",
      });
    }

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      statusCode: 401,
      message: "توکن منقضی شده یا معتبر نمی باشد!",
    });
  }
};
