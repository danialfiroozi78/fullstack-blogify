"use client";

import { useLazyGetMyArticlesQuery } from "@/api/query/articles.query";
import { useEffect } from "react";

export default function useMyArticles() {
  const [
    getMyArticles,
    { isFetching: myArticlesFetching, data: myArticlesData },
  ] = useLazyGetMyArticlesQuery();

  useEffect(() => {
    getMyArticles(null);
  }, []);

  return {
    getMyArticles,
    myArticlesFetching,
    myArticlesData,
  };
}
