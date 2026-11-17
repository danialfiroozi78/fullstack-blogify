import { apiUrls } from "@/utils/apiUrls";
import { BaseApi } from "../baseApi";
import { ApiRes } from "@/types/common.type";
import { MyArticlesResType } from "@/types/query.type";

export const MyArticlesQuery = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      getMyArticles: build.query<ApiRes<MyArticlesResType>, null>({
        query: () => ({
          url: apiUrls.myArticles,
        }),
        providesTags: ["myArticles"],
      }),
      getMyArticleDetails: build.query<
        ApiRes<MyArticlesResType["0"]>,
        { id: number }
      >({
        query: ({ id }) => ({
          url: apiUrls.myArticleDetails + id,
        }),
      }),
    };
  },
});

export const { useLazyGetMyArticlesQuery, useGetMyArticleDetailsQuery } =
  MyArticlesQuery;
