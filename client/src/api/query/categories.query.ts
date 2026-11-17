import { apiUrls } from "@/utils/apiUrls";
import { BaseApi } from "../baseApi";
import { ApiRes } from "@/types/common.type";
import { CategoriesResType } from "@/types/query.type";

export const CategoriesQuery = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      getCategories: build.query<ApiRes<CategoriesResType>, null>({
        query: () => ({
          url: apiUrls.categories,
        }),
      }),
    };
  },
});

export const { useGetCategoriesQuery } = CategoriesQuery;
