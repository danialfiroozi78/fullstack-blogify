import { z } from "zod";

export const sendOtpSchema = z.object({
  phone_number: z
    .string({
      error: "شماره موبایل الزامی است!",
    })
    .refine((value) => value.trim().length > 0, {
      message: "شماره موبایل الزامی است!",
      abort: true,
    })
    .refine((value) => value.length === 11, {
      message: "شماره موبایل باید ۱۱ رقم باشد!",
      abort: true,
    })
    .refine((value) => /^09\d{9}$/.test(value), {
      message: "فرمت شماره موبایل معتبر نمی‌باشد!",
      abort: true,
    }),
});

export const verifyOtpSchema = z.object({
  phone_number: z
    .string({
      error: "شماره موبایل الزامی است!",
    })
    .refine((value) => value.trim().length > 0, {
      message: "شماره موبایل الزامی است!",
      abort: true,
    })
    .refine((value) => value.length === 11, {
      message: "شماره موبایل باید ۱۱ رقم باشد!",
      abort: true,
    })
    .refine((value) => /^09\d{9}$/.test(value), {
      message: "فرمت شماره موبایل معتبر نمی‌باشد!",
      abort: true,
    }),
  code: z
    .string({
      error: "!کد یکبار مصرف الزامی است",
    })
    .refine((value) => value.trim().length > 0, {
      message: "!کد یکبار مصرف الزامی است",
      abort: true,
    })
    .refine((value) => value.length <= 5, {
      message: "!کد یکبار مصرف باید ۵ رقم باشد",
      abort: true,
    }),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
});

export const registerSchema = z.object({
  first_name: z.string().min(2, "!نام باید حداقل 2 کاراکتر باشد"),
  last_name: z.string().min(2, "!نام خانوادگی باید حداقل 2 کاراکتر باشد"),
});
