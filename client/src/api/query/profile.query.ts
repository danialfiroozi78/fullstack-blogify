import { apiUrls } from "@/utils/apiUrls";
import { BaseApi } from "../baseApi";
import { ApiRes } from "@/types/common.type";
import { UpdateProfileResType } from "@/types/mutation.type";

export const ProfileQuery = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      getProfile: build.query<ApiRes<UpdateProfileResType>, null>({
        query: () => ({
          url: apiUrls.getProfile,
        }),
        providesTags: ["profile"],
      }),
    };
  },
});

export const { useGetProfileQuery } = ProfileQuery;
