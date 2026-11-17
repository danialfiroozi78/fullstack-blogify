import { BaseApi } from "../baseApi";
import { apiUrls } from "@/utils/apiUrls";
import { ApiRes } from "@/types/common.type";
import { CreateNewArticleReqType } from "@/types/mutation.type";

export const ArticleMutation = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      createArticle: build.mutation<ApiRes, FormData>({
        query: (formData) => ({
          method: "POST",
          url: apiUrls.createArticles,
          data: formData,
        }),
        invalidatesTags: ["myArticles"],
      }),
      deleteMyArticle: build.mutation<ApiRes, { id: number }>({
        query: ({ id }) => ({
          method: "DELETE",
          url: apiUrls.deleteMyArticle + id,
        }),
        invalidatesTags: ["myArticles"],
      }),
    };
  },
});

export const { useCreateArticleMutation, useDeleteMyArticleMutation } =
  ArticleMutation;
