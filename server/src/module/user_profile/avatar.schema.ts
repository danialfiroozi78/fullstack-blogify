import { z } from "zod";

export const avatarSchema = z.looseObject({
  mimetype: z.enum(["image/jpeg", "image/png", "image/webp"], {
    error: "فرمت تصویر باید JPG، PNG یا WEBP باشد!",
  }),

  size: z
    .number()
    .max(2 * 1024 * 1024, "حجم تصویر نباید بیشتر از ۲ مگابایت باشد!"),
});
