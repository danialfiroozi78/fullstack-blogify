import { apiUrls } from "@/utils/apiUrls";
import { BaseApi } from "../baseApi";
import { ApiRes } from "@/types/common.type";
import { MyArticleCommentsResType } from "@/types/query.type";

export const MyArticleCommentsQuery = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      getMyArticleComments: build.query<
        ApiRes<MyArticleCommentsResType>,
        { id: number }
      >({
        query: ({ id }) => ({
          url: apiUrls.myArticleComments + id,
        }),
        providesTags: ["comments"],
      }),
    };
  },
});

export const { useGetMyArticleCommentsQuery } = MyArticleCommentsQuery;
