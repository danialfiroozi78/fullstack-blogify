import "dotenv/config";
import { Request, Response } from "express";
import {
  logOutService,
  sendOtpService,
  verifyOtpService,
} from "./auth.service.js";

export const sendOtpController = async (req: Request, res: Response) => {
  const { isNewUser, expires_in, code } = await sendOtpService(req.body);

  return res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    message: "کد یکبار مصرف برای شما ارسال شد!",
    data: { isNewUser, expires_in, code },
  });
};

export const verifyOtpController = async (req: Request, res: Response) => {
  const result = await verifyOtpService(req.body);

  res.cookie("access_token", result.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  const statusCode = result.isNewUser ? 201 : 200;

  return res.status(statusCode).json({
    isSuccess: true,
    statusCode,
    message: result.isNewUser
      ? "ثبت‌ نام با موفقیت انجام شد!"
      : "ورود با موفقیت انجام شد!",
    data: {
      isNewUser: result.isNewUser,
      userId: result.userId,
    },
  });
};

export const logOutController = (req: Request, res: Response) => {
  const result = logOutService(res);

  return res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    message: result.message,
  });
};
