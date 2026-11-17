"use client";

import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/api/mutation/auth.mutation";
import { SendOtpType } from "@/types/auth.type";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SendOtpType>();

  const {
    reset: otpReset,
    register: otpRegister,
    handleSubmit: otpHandleSubmit,
    control: otpControl,
    formState: { errors: otpErrors },
  } = useForm<{
    code: string;
    first_name?: string;
    last_name?: string;
  }>();

  const router = useRouter();

  const [authStage, setAuthStage] = useState<"sendOtp" | "verifyOtp">(
    "sendOtp",
  );

  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer <= 0) return;

    const timeout = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timer]);

  const [sendOtpMutation, { isLoading, data }] = useSendOtpMutation();
  const [verifyOtpMutation, { isLoading: verifyOtpLoading }] =
    useVerifyOtpMutation();

  const sendOtpFn: SubmitHandler<SendOtpType> = (data) => {
    sendOtpMutation({ phone_number: data.phone_number }).then(({ data }) => {
      if (data?.isSuccess) {
        setAuthStage("verifyOtp");
        setTimer(+data?.data?.expires_in);
      }
    });
  };

  const verifyOtp: SubmitHandler<{
    code: string;
    first_name?: string;
    last_name?: string;
  }> = (data) => {
    verifyOtpMutation({
      code: data?.code,
      phone_number: getValues("phone_number"),
      first_name: data?.first_name,
      last_name: data?.last_name,
    }).then(({ data }) => {
      if (data?.isSuccess) {
        toast.success(data?.message);
        router.replace("/profile");
        router.refresh();
        setTimer(120);
        otpReset({ code: "", first_name: "", last_name: "" });
        setValue("phone_number", "");
        setAuthStage("sendOtp");
      }
    });
  };

  const resendOtpFn: SubmitHandler<SendOtpType> = (data) => {
    sendOtpMutation({ phone_number: data.phone_number }).then(({ data }) => {
      if (data?.isSuccess) {
        setTimer(+data?.data?.expires_in);
      }
    });
  };

  return {
    register,
    handleSubmit,
    sendOtpFn,
    errors,
    isLoading,
    data,
    authStage,
    otpHandleSubmit,
    otpControl,
    verifyOtp,
    otpRegister,
    otpErrors,
    timer,
    resendOtpFn,
    verifyOtpLoading,
  };
}
