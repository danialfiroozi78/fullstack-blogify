"use client";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { FileInput } from "@/components/common/InputFile";
import { TextArea } from "@/components/common/Textarea";
import useProfile from "@/hooks/useProfile";
import { Check, User } from "lucide-react";
import { Controller } from "react-hook-form";
import ProfileSkeletonLoading from "@/components/common/loading/ProfileSkeletonLoading";

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    updateProfileFn,
    updateProfileLoading,
    control,
    profileFetching,
  } = useProfile();

  return (
    <section>
      <title>ورود یا ثبت نام | بلاگیفای</title>
      <meta
        name="description"
        content="جدیدترین و محبوب‌ترین مقالات بلاگیفای را کشف کنید."
      />

      <div className="mb-10 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 shadow-[0_4px_20px_rgba(109,40,217,0.04)]">
        <div className="h-12 w-1 shrink-0 rounded-full bg-primary" />

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-box text-primary">
          <User className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h1 className="text-lg font-extrabold text-text-primary">پروفایل</h1>

          <p className="text-xs text-text-secondary">
            برای اشنایی با شما می توانید پروفایل خود را تکمیل کنید!
          </p>
        </div>
      </div>

      {profileFetching ? (
        <ProfileSkeletonLoading />
      ) : (
        <>
          {" "}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="نام:"
                {...register("first_name", {
                  required: "این فیلد نمی تواند خالی باشد!",
                })}
              />
              <Input
                label="نام خانوادگی:"
                {...register("last_name", {
                  required: "این فیلد نمی تواند خالی باشد!",
                })}
              />
              <Input
                label="شماره موبایل:"
                {...register("phone_number")}
                disabled
              />
              <Input label="نام کاربری:" {...register("user_name")} />
              <Input label="ایمیل:" {...register("email")} />
              <Input label="وب سایت:" {...register("website")} />
              <Input label="تاریخ تولد:" {...register("birth_date")} />
            </div>

            <TextArea
              helperText="حداکثر 500 کاراکتر مجاز می باشد!"
              label="بیوگرافی:"
              {...register("bio")}
              placeholder="چی دوست داری ازت بدونیم؟"
            />

            <Controller
              name="avatar"
              control={control}
              render={({ field, fieldState }) => (
                <FileInput
                  label="تصویر پروفایل"
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  error={fieldState.error?.message}
                  maxSizeMB={2}
                />
              )}
            />
          </div>
          <div className="text-left mt-10">
            <Button
              loading={updateProfileLoading}
              onClick={handleSubmit(updateProfileFn)}
            >
              <Check className="size-5" />
              ثبت تغییرات
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
