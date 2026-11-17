"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { CreateNewArticleFormType } from "@/types/form.type";
import { useGetCategoriesQuery } from "@/api/query/categories.query";
import { useCreateArticleMutation } from "@/api/mutation/article.mutation";
import toast from "react-hot-toast";

export default function useNewArticle() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateNewArticleFormType>();

  const { categories } = useGetCategoriesQuery(null, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.data ?? [],
      isLoading,
    }),
  });

  const [createArticleMutation, { isLoading: createArticleLoading }] =
    useCreateArticleMutation();

  const createArticle: SubmitHandler<CreateNewArticleFormType> = async (
    data,
  ) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("category_id", String(Number(data.category_id)));
    formData.append("status", data.status as string);
    formData.append("allow_comments", String(data.allow_comments === "true"));

    if (data.thumbnail_image instanceof File)
      formData.append("thumbnail_image", data.thumbnail_image);

    if (data.cover_image instanceof File)
      formData.append("cover_image", data.cover_image);

    try {
      const response = await createArticleMutation(formData).unwrap();

      if (response.isSuccess) {
        toast.success(response.message);

        reset({
          allow_comments: null,
          category_id: null,
          content: "",
          excerpt: "",
          status: null,
          title: "",
          thumbnail_image: null,
          cover_image: null,
        });
      }
    } catch (error) {
      // console.error(error);
      toast.error("خطایی هنگام ایجاد مقاله رخ داد!");
    }
  };

  return {
    categories,
    register,
    handleSubmit,
    errors,
    control,
    createArticle,
    createArticleLoading,
  };
}
