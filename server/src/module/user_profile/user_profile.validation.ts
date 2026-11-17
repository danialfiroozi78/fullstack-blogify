import { z } from "zod";

// تبدیل رشته خالی یا فاصله خالی به null
const emptyToNull = (schema: z.ZodType) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    schema.nullish(),
  );

export const updateProfileSchema = z.strictObject({
  // UserModel
  first_name: z
    .string({
      error: "نام باید رشته باشد!",
    })
    .refine((value) => value.trim().length > 0, {
      message: "نام نمی‌تواند خالی باشد!",
      abort: true,
    })
    .refine((value) => value.trim().length >= 2, {
      message: "نام باید حداقل ۲ کاراکتر باشد!",
      abort: true,
    })
    .refine((value) => value.trim().length <= 100, {
      message: "نام نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد!",
      abort: true,
    }),

  last_name: z
    .string({
      error: "نام خانوادگی باید رشته باشد!",
    })
    .refine((value) => value.trim().length > 0, {
      message: "نام خانوادگی نمی‌تواند خالی باشد!",
      abort: true,
    })
    .refine((value) => value.trim().length >= 2, {
      message: "نام خانوادگی باید حداقل ۲ کاراکتر باشد!",
      abort: true,
    })
    .refine((value) => value.trim().length <= 100, {
      message: "نام خانوادگی نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد!",
      abort: true,
    }),

  // UserProfileModel
  email: emptyToNull(
    z
      .string({
        error: "ایمیل باید رشته باشد!",
      })
      .refine((value) => z.email().safeParse(value).success, {
        message: "فرمت ایمیل معتبر نمی‌باشد!",
        abort: true,
      }),
  ),

  user_name: emptyToNull(
    z
      .string({
        error: "نام کاربری باید رشته باشد!",
      })
      .refine((value) => value.trim().length >= 3, {
        message: "نام کاربری باید حداقل ۳ کاراکتر باشد!",
        abort: true,
      })
      .refine((value) => value.trim().length <= 100, {
        message: "نام کاربری نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد!",
        abort: true,
      })
      .refine((value) => /^[a-zA-Z0-9_]+$/.test(value), {
        message: "نام کاربری فقط می‌تواند شامل حروف انگلیسی، عدد و _ باشد!",
        abort: true,
      }),
  ),

  bio: emptyToNull(
    z
      .string({
        error: "بیوگرافی باید رشته باشد!",
      })
      .refine((value) => value.trim().length <= 500, {
        message: "بیوگرافی نمی‌تواند بیشتر از ۵۰۰ کاراکتر باشد!",
        abort: true,
      }),
  ),

  website: emptyToNull(
    z.string({
      error: "آدرس وب‌سایت باید رشته باشد!",
    }),
    // .refine((value) => z.url().safeParse(value).success, {
    //   message: "آدرس وب‌سایت معتبر نمی‌باشد!",
    //   abort: true,
    // }),
  ),

  birth_date: emptyToNull(
    z
      .string({
        error: "تاریخ تولد باید رشته باشد!",
      })
      .refine((value) => z.iso.date().safeParse(value).success, {
        message: "فرمت تاریخ تولد معتبر نمی‌باشد!",
        abort: true,
      }),
  ),

  avatar: emptyToNull(
    z.string({
      error: "آدرس آواتار باید رشته باشد!",
    }),
  ),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
