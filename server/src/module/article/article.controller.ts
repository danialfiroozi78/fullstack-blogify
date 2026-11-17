import { createArticleSchema } from "./article.validation";
import { Response, Request, NextFunction } from "express";
import {
  createArticleService,
  deleteMyArticleDetailsService,
  getArticleDetailsService,
  getArticlesService,
  getMyArticleDetailsService,
  getMyArticlesService,
} from "./article.service";

export const createArticleController = async (
  req: Request & { user?: { id: number } },
  res: Response,
) => {
  try {
    const result = createArticleSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errorMessage: Object.values(result.error.flatten().fieldErrors).flat(),
      });
    }

    const authorId = req.user?.id;

    if (!authorId) {
      return res.status(401).json({
        message: "ابتدا وارد حساب کاربری شوید",
      });
    }

    const files = req.files as
      Record<string, Express.Multer.File[]> | undefined;

    const thumbnail = files?.thumbnail_image?.[0];
    const cover = files?.cover_image?.[0];

    if (!thumbnail || !cover) {
      return res.status(400).json({
        message: "هر دو تصویر مقاله الزامی هستند",
      });
    }

    const article = await createArticleService(result.data, authorId, {
      thumbnail,
      cover,
    });

    return res.status(201).json({
      isSuccess: true,
      statusCode: 201,
      message: "مقاله با موفقیت ایجاد شد!",
      data: article,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMyArticlesController = async (
  req: Request & { user?: { id: number } },
  res: Response,
  next: NextFunction,
) => {
  const result = await getMyArticlesService(req.user?.id as number);

  res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    message:
      result.length > 0
        ? "مقالات شما با موفقیت دریافت شد!"
        : "هنوز مقاله‌ای ایجاد نکرده‌اید!",
    data: result,
  });
};

export const getMyArticleDetailsController = async (
  req: Request & { user?: { id: number } },
  res: Response,
) => {
  const articleId = Number(req.params.id);
  const result = await getMyArticleDetailsService(
    req.user?.id as number,
    articleId,
  );

  res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    message: "جزئیات مقاله با موفقیت دریافت شد!",
    data: result,
  });
};

export const deleteMyArticleDetailsController = async (
  req: Request & { user?: { id: number } },
  res: Response,
) => {
  const result = await deleteMyArticleDetailsService(
    Number(req.params.id),
    req.user?.id as number,
  );

  return res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    message: result.message,
  });
};

// manage public articles
export const getArticlesController = async (req: Request, res: Response) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";

  const category =
    typeof req.query.category === "string"
      ? Number(req.query.category)
      : undefined;

  const sort =
    typeof req.query.sort === "string" ? Number(req.query.sort) : undefined;

  const limit =
    typeof req.query.limit === "string" ? Number(req.query.limit) : undefined;

  const result = await getArticlesService({ search, category, sort, limit });

  return res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    data: result,
  });
};

export const getArticleDetailsController = async (
  req: Request,
  res: Response,
) => {
  const articleSlug = req.params.slug as string;
  const result = await getArticleDetailsService(articleSlug);

  res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    data: result,
  });
};
