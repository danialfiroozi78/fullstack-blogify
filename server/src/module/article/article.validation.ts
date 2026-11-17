import { z } from "zod";

export const createArticleSchema = z
  .object({
    title: z
      .string({
        error: "عنوان مقاله الزامی است",
      })
      .trim()
      .min(5, "عنوان باید حداقل ۵ کاراکتر باشد")
      .max(255, "عنوان نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد"),

    excerpt: z
      .string({
        error: "خلاصه مقاله الزامی است",
      })
      .trim()
      .max(1000, "خلاصه نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد"),

    content: z
      .string({
        error: "محتوای مقاله الزامی است",
      })
      .trim()
      .min(20, "محتوای مقاله باید حداقل ۲۰ کاراکتر باشد"),

    category_id: z
      .string({
        error: "شناسه دسته‌بندی الزامی است",
      })
      .regex(/^[1-9]\d*$/, "شناسه دسته‌بندی باید عدد صحیح مثبت باشد")
      .transform(Number),

    status: z
      .enum(["draft", "published"], {
        error: "وضعیت مقاله نامعتبر است",
      })
      .default("draft"),

    allow_comments: z
      .enum(["true", "false"], {
        error: "وضعیت نظرات باید فعال یا غیرفعال باشد",
      })
      .default("true")
      .transform((value) => value === "true"),
  })
  .strict();
