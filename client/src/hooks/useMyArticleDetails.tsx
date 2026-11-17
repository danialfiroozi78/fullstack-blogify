"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetMyArticleDetailsQuery } from "@/api/query/articles.query";
import { useGetMyArticleCommentsQuery } from "@/api/query/comments.query";
import { useState } from "react";
import { useDeleteMyArticleMutation } from "@/api/mutation/article.mutation";

export default function useMyArticleDetails() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { data, isFetching } = useGetMyArticleDetailsQuery({
    id: Number(params?.id),
  });

  const [
    deleteArticle,
    { isLoading: deleteArticleLoading, data: deleteArticleData },
  ] = useDeleteMyArticleMutation();

  const comments = useGetMyArticleCommentsQuery({ id: Number(params?.id) });

  return {
    data,
    isFetching,
    params,
    comments,
    setOpen,
    open,
    router,
    deleteArticleLoading,
    deleteArticleData,
    deleteArticle,
  };
}
