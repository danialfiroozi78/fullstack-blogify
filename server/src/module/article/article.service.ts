import path from "node:path";
import { mkdir, rm } from "node:fs/promises";
import sharp from "sharp";
import { ArticleModel } from "./article.model";
import { CategoryModel } from "../category/category.model";
import createHttpError from "http-errors";
import { UserModel } from "../user/user.model";
import { Op } from "@sequelize/core";
import { UserProfileModel } from "../user_profile/user_profile.model";

const calculateReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean);

  return Math.max(1, Math.ceil(words.length / 200));
};

export const createArticleService = async (
  data: {
    title: string;
    excerpt: string;
    content: string;
    category_id: number;
    status: "draft" | "published";
    allow_comments: boolean;
  },
  authorId: number,
  files: {
    thumbnail: Express.Multer.File;
    cover: Express.Multer.File;
  },
) => {
  const { title, excerpt, content, category_id, status, allow_comments } = data;

  const generateSlug = (title: string): string => {
    return title
      .trim()
      .toLowerCase()
      .normalize("NFC")
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/[\s\u200c]+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  // Publication date
  const publishedAt = status === "published" ? new Date() : null;

  const article = await ArticleModel.create({
    title,
    slug: generateSlug(title),
    excerpt,
    content,
    cover_image: "pending",
    thumbnail_image: "pending",
    category_id,
    status,
    allow_comments,
    author_id: authorId,
    reading_time: readingTime,
    published_at: publishedAt,
  });

  const articleId = article.get("id") as number;

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "articles",
    String(articleId),
  );

  try {
    await mkdir(uploadDir, { recursive: true });

    await sharp(files.thumbnail.buffer)
      .rotate()
      .resize(800, 450, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(path.join(uploadDir, "thumbnail.webp"));

    await sharp(files.cover.buffer)
      .rotate()
      .resize(1600, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(path.join(uploadDir, "cover.webp"));

    await article.update({
      thumbnail_image: `/uploads/articles/${articleId}/thumbnail.webp`,
      cover_image: `/uploads/articles/${articleId}/cover.webp`,
    });

    return article.get({ plain: true });
  } catch (error) {
    try {
      await rm(uploadDir, {
        recursive: true,
        force: true,
      });

      await article.destroy();
    } catch (cleanupError) {
      console.error("Cleanup error:", cleanupError);
    }

    throw error;
  }
};

export const getMyArticlesService = async (userId: number) => {
  const articles = await ArticleModel.findAll({
    where: {
      author_id: userId,
    },
    attributes: {
      exclude: ["category_id", "author_id", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: CategoryModel,
        as: "category",
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      },
    ],
  });

  return articles.map((article) => {
    const data = article.get({ plain: true });

    return {
      ...data,
      published_at: data.published_at
        ? new Intl.DateTimeFormat("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Tehran",
          }).format(data.published_at)
        : null,
    };
  });
};

export const getMyArticleDetailsService = async (
  userId: number,
  articleId: number,
) => {
  const details = await ArticleModel.findOne({
    where: { id: articleId, author_id: userId },
    attributes: {
      exclude: ["category_id", "author_id", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: CategoryModel,
        as: "category",
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      },
    ],
  });

  const detailsGetPlain = details?.get({ plain: true });

  return {
    ...detailsGetPlain,
    published_at: detailsGetPlain?.published_at
      ? new Intl.DateTimeFormat("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "Asia/Tehran",
        }).format(new Date(detailsGetPlain.published_at))
      : null,
  };
};

export const deleteMyArticleDetailsService = async (
  articleId: number,
  userId: number,
) => {
  const article = await ArticleModel.findOne({
    where: { id: articleId, author_id: userId },
  });

  if (!article)
    throw createHttpError(404, "مقاله پیدا نشد یا متعلق به شما نیست!");

  await article.destroy();

  return {
    message: "مقاله با موفقیت حذف شد!",
  };
};

// manage public articles
type GetArticlesParams = {
  search?: string;
  category?: number;
  sort?: number;
  limit?: number;
};

export const getArticlesService = async ({
  search,
  category,
  sort = 1,
  limit,
}: GetArticlesParams) => {
  let order: [string, "ASC" | "DESC"][];

  switch (sort) {
    case 2:
      order = [["published_at", "ASC"]]; // oldest
      break;
    case 3:
      order = [["views_count", "DESC"]]; // more visited
      break;
    default:
      order = [["published_at", "DESC"]]; // newest
  }

  const articles = await ArticleModel.findAll({
    where: {
      status: "published",

      ...(search?.trim() && {
        title: {
          [Op.like]: `%${search.trim()}%`,
        },
      }),

      ...(category && {
        category_id: category,
      }),
    },
    attributes: [
      "id",
      "title",
      "slug",
      "excerpt",
      "thumbnail_image",
      "status",
      "published_at",
      "views_count",
    ],
    include: [
      {
        model: CategoryModel,
        as: "category",
        attributes: ["id", "name"],
      },
      {
        model: UserModel,
        as: "author",
        attributes: ["id", "first_name", "last_name"],
      },
    ],
    order,
    limit,
  });

  return articles.map((article) => {
    const data = article.get({ plain: true });

    return {
      ...data,
      published_at: data.published_at
        ? new Intl.DateTimeFormat("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "Asia/Tehran",
          }).format(data.published_at)
        : null,
    };
  });
};

export const getArticleDetailsService = async (slug: string) => {
  const article = await ArticleModel.findOne({
    where: { slug, status: "published" },
    attributes: {
      exclude: ["createdAt", "updatedAt", "author_id", "thumbnail_image"],
    },
    include: [
      {
        model: CategoryModel,
        as: "category",
        attributes: ["id", "name"],
      },
      {
        model: UserModel,
        as: "author",
        attributes: ["id", "first_name", "last_name"],
        include: {
          model: UserProfileModel,
          as: "profile",
          attributes: ["avatar"],
        },
      },
    ],
  });

  if (!article) throw createHttpError(404, "مقاله مورد نظر یافت نشد!");

  await article.increment("views_count", { by: 1 });

  const detailsGetPlain = article?.get({ plain: true });

  return {
    ...detailsGetPlain,
    published_at: detailsGetPlain?.published_at
      ? new Intl.DateTimeFormat("fa-IR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "Asia/Tehran",
        }).format(new Date(detailsGetPlain.published_at))
      : null,
  };
};
