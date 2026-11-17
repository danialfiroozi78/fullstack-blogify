import { BaseApi } from "../baseApi";
import { apiUrls } from "@/utils/apiUrls";
import { ApiRes } from "@/types/common.type";

export const CommentMutation = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      addComment: build.mutation<
        ApiRes,
        {
          id: number;
          content: string;
          guest_name?: string;
          guest_email?: string;
        }
      >({
        query: ({ id, ...body }) => ({
          method: "POST",
          url: apiUrls.addComment + id,
          data: body,
        }),
        invalidatesTags: ["comments"],
      }),
    };
  },
});

export const { useAddCommentMutation } = CommentMutation;
