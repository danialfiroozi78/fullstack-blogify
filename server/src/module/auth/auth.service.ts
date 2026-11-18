import "dotenv/config";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { randomInt } from "node:crypto";
import { UserModel } from "../user/user.model.js";
import { OtpModel } from "../otp/otp.model.js";
import { registerSchema } from "./auth.validation.js";
import { Response } from "express";

export const sendOtpService = async (data: { phone_number: string }) => {
  const generatedOtp = randomInt(10000, 100000).toString();
  const expires_at = new Date(Date.now() + 2 * 60 * 1000);
  const { phone_number } = data;
  const user = await UserModel.findOne({
    where: { phone_number },
  });
  const isNewUser = user === null;

  await OtpModel.upsert({
    phone_number,
    code: generatedOtp,
    expires_at,
  });

  return {
    isNewUser,
    expires_in: 120,
    code: generatedOtp,
  };
};

export const verifyOtpService = async (data: {
  phone_number: string;
  code: string;
}) => {
  const { phone_number, code } = data;

  const otp = await OtpModel.findOne({ where: { phone_number } });
  if (!otp)
    throw createHttpError(
      400,
      "کد یکبار مصرف ارسال شده معتبر نمی باشد یا منقضی شده است!",
    );

  // check expiration
  const expiresAt = new Date(otp.get("expires_at") as Date).getTime();
  if (Date.now() >= expiresAt)
    throw createHttpError(400, "کد یکبار مصرف وارد شده منقضی شده است!");

  // verify code with db code
  const verifyCode = otp.get("code") === code;
  if (!verifyCode)
    throw createHttpError(400, "کد یکبار مصرف ارسال شده معتبر نمی باشد!");

  let user = await UserModel.findOne({ where: { phone_number } });
  const isNewUser = user === null;

  if (isNewUser) {
    const registrationData = registerSchema.safeParse(data);

    if (!registrationData.success) {
      throw createHttpError(400, "نام و نام خانوادگی برای ثبت نام الزامی است!");
    }

    const { first_name, last_name } = registrationData.data;
    user = await UserModel.create({
      phone_number,
      first_name,
      last_name,
    });
  }

  await otp.destroy();

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const userId = user?.get("id");
  const access_token = jwt.sign({ userId }, secret, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  return {
    access_token,
    isNewUser,
    userId: Number(user?.get("id")),
  };
};

export const logOutService = (res: Response) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return {
    message: "با موفقیت از حساب کاربری خارج شدید!",
  };
};
