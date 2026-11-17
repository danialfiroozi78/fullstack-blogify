import {
  GetArticleCommentsResType,
  GetArticleDetailsResType,
  GetArticlesResType,
} from "@/types/query.type";

export type Category = {
  id: number;
  name: string;
  slug: string;
};

type CategoriesResponse = {
  isSuccess: boolean;
  data: Category[];
};

type ArticleFilters = {
  search?: string;
  category?: string;
  sort?: string;
};

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.API_URL}categories`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      throw new Error("خطا در دریافت دسته‌بندی‌ها");
    }

    const result: CategoriesResponse = await res.json();

    return result.data;
  } catch (error) {
    console.error("Categories fetch error:", error);
    return [];
  }
}

export const getArticles = async (
  filters: ArticleFilters = {},
): Promise<GetArticlesResType> => {
  const query = new URLSearchParams();

  if (filters.search) query.set("search", filters.search);
  if (filters.category) query.set("category", filters.category);
  if (filters.sort) query.set("sort", filters.sort);

  const response = await fetch(
    `${process.env.API_URL}articles?${query.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت مقالات");
  }

  return await response.json();
};

export async function getArticleDetails(
  slug: string,
): Promise<GetArticleDetailsResType> {
  const res = await fetch(`${process.env.API_URL}articles/details/${slug}`, {
    next: {
      revalidate: 3600,
    },
  });

  return await res.json();
}

export async function getArticleComments(
  id: number,
): Promise<GetArticleCommentsResType> {
  const res = await fetch(`${process.env.API_URL}comments/article/${id}`, {
    next: {
      revalidate: 3600,
    },
  });

  return await res.json();
}

export const getNewestArticles = async (): Promise<GetArticlesResType> => {
  const response = await fetch(
    `${process.env.API_URL}articles?sort=1&limit=4`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت مقالات");
  }

  return await response.json();
};

export const getMoreVisitedArticles = async (): Promise<GetArticlesResType> => {
  const response = await fetch(
    `${process.env.API_URL}articles?sort=3&limit=4`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت مقالات");
  }

  return await response.json();
};
