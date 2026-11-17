import {
  SendOtpReqType,
  SendOtpResType,
  VerifyOtpReqType,
  VerifyOtpResType,
} from "../../types/mutation.type";
import { BaseApi } from "../baseApi";
import { apiUrls } from "@/utils/apiUrls";
import { ApiRes } from "@/types/common.type";

export const AuthMutation = BaseApi.injectEndpoints({
  endpoints(build) {
    return {
      sendOtp: build.mutation<ApiRes<SendOtpResType>, SendOtpReqType>({
        query: (data) => ({
          method: "POST",
          url: apiUrls.sendOtp,
          data,
        }),
      }),
      verifyOtp: build.mutation<ApiRes<VerifyOtpResType>, VerifyOtpReqType>({
        query: (data) => ({
          method: "POST",
          url: apiUrls.verifyOtp,
          data,
        }),
      }),
      logout: build.mutation<ApiRes, null>({
        query: () => ({
          method: "POST",
          url: apiUrls.logout,
        }),
      }),
    };
  },
});

export const { useSendOtpMutation, useVerifyOtpMutation, useLogoutMutation } =
  AuthMutation;
