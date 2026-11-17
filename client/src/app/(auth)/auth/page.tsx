"use client";

import Image from "next/image";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import Logo from "@/public/images/png/logo-sm.png";
import useAuth from "@/hooks/useAuth";
import OTPInput from "@/components/modules/otpInput.module";

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    sendOtpFn,
    errors,
    isLoading,
    data,
    authStage,
    otpHandleSubmit,
    verifyOtp,
    otpControl,
    otpRegister,
    otpErrors,
    timer,
    resendOtpFn,
    verifyOtpLoading,
  } = useAuth();

  return (
    <div className="mx-auto md:w-3/7 lg:w-2/6">
      <div className="bg-card p-5 rounded-xl">
        <Image src={Logo} alt="لوگو" className="size-20 mb-2 block mx-auto" />
        <h1 className="text-center text-text-primary font-extrabold text-lg">
          ورود یا ثبت نام
        </h1>
        {authStage === "sendOtp" ? (
          <div>
            <small className="text-text-secondary font-light text-center block mb-10">
              لطفا جهت ورود و یا ثبت نام در بلاگیفای شماره همراه خود را وارد
              کنید.
            </small>

            <Input
              label="شماره موبایل:"
              inputMode="numeric"
              maxLength={11}
              {...register("phone_number", {
                required: "شماره موبایل الزامی است!",
                pattern: {
                  value: /^09\d{9}$/,
                  message: "شماره موبایل معتبر نیست!",
                },
              })}
              error={errors.phone_number?.message}
            />

            <Button
              iconPosition="end"
              icon={<ArrowLeft className="size-5" />}
              className="w-full mt-5"
              loading={isLoading}
              onClick={handleSubmit(sendOtpFn)}
            >
              دریافت کد فعالسازی{" "}
            </Button>
          </div>
        ) : (
          <div>
            <small className="text-text-secondary font-light block mb-10 text-center">
              تکمیل اطلاعات زیر جهت تکمیل فرآیند ثبت نام شما و احراز هویت
              الزامیست.
            </small>

            <OTPInput
              name="code"
              control={otpControl}
              label="لطفا کد ۵ رقمی ارسال شده به شماره همراه را وارد نمایید."
              length={5}
              inputSize="md"
              rules={{
                required: "کد تأیید الزامی است!",
                pattern: {
                  value: /^\d{5}$/,
                  message: "کد تأیید باید ۵ رقم باشد!",
                },
              }}
            />

            {data?.data?.isNewUser && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                <Input
                  label="نام:"
                  {...otpRegister("first_name", {
                    required: "وارد کردن نام الزامی است!",
                  })}
                  error={otpErrors.first_name?.message}
                />
                <Input
                  label="نام خانوادگی:"
                  {...otpRegister("last_name", {
                    required: "وارد کردن نام خانوادگی الزامی است!",
                  })}
                  error={otpErrors.last_name?.message}
                />
              </div>
            )}

            <div className="flex justify-center mt-2">
              {timer > 0 ? (
                <small className="text-text-secondary">
                  <strong className="text-base text-text-primary">
                    {timer}
                  </strong>{" "}
                  ثانیه تا ارسال مجدد کد
                </small>
              ) : (
                <Button variant="ghost" onClick={handleSubmit(resendOtpFn)}>
                  <RefreshCcw className="size-4" />
                  ارسال مجدد کد
                </Button>
              )}
            </div>

            <Button
              iconPosition="end"
              icon={<ArrowLeft className="size-5" />}
              className="w-full mt-5"
              onClick={otpHandleSubmit(verifyOtp)}
              loading={verifyOtpLoading}
            >
              {data?.data?.isNewUser ? "نکمیل ثبت نام" : "ورود به پنل"}
            </Button>
            {authStage === "verifyOtp" && (
              <p className="text-sm text-text-primary mt-2 text-center">
                کد یکبار مصرف:{" "}
                <strong className="underline">{data?.data?.code}</strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
