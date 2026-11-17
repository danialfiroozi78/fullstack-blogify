import { BaseApi } from "../baseApi";
import { apiUrls } from "@/utils/apiUrls";
import { ApiRes } from "@/types/common.type";

export const ProfileMutation = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      updateProfile: build.mutation<ApiRes, FormData>({
        query: (formData) => ({
          method: "PATCH",
          url: apiUrls.updateProfile,
          data: formData,
        }),
        invalidatesTags: ["profile"],
      }),
    };
  },
});

export const { useUpdateProfileMutation } = ProfileMutation;
