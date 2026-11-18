"use client";

import { useUpdateProfileMutation } from "@/api/mutation/profile.mutation";
import { useGetProfileQuery } from "@/api/query/profile.query";
import { UpdateProfileFormType } from "@/types/form.type";
import { convertGregorianToJalali } from "@/utils/functions";
import { toGregorian } from "jalaali-js";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function useProfile() {
  const { register, handleSubmit, setValues, control, setValue } =
    useForm<UpdateProfileFormType>({
      defaultValues: {
        avatar: null,
      },
    });

  const { data: profileData, isFetching: profileFetching } =
    useGetProfileQuery(null);

  const [updateProfileMutation, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();

  const updateProfileFn: SubmitHandler<UpdateProfileFormType> = async (
    data,
  ) => {
    try {
      const formData = new FormData();

      const { phone_number, avatar, birth_date, ...profileData } = data;

      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value === null ? "" : String(value));
        }
      });

      if (birth_date?.trim()) {
        const [year, month, day] = birth_date.split("/").map(Number);

        const { gy, gm, gd } = toGregorian(year, month, day);

        const gregorianDate = `${gy}-${String(gm).padStart(2, "0")}-${String(gd).padStart(2, "0")}`;

        formData.append("birth_date", gregorianDate);
      } else {
        formData.append("birth_date", "");
      }

      if (avatar instanceof File) formData.append("avatar", avatar);

      const response = await updateProfileMutation(formData).unwrap();

      if (response?.isSuccess) {
        toast.success(response.message);
        setValue("avatar", null);
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error("خطا در بروزرسانی پروفایل");
    }
  };

  useEffect(() => {
    if (profileData?.data) {
      const data = profileData?.data;

      setValues({
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone_number: data?.phone_number,
        email: data?.profile?.email,
        user_name: data?.profile?.user_name,
        website: data?.profile?.website,
        bio: data?.profile?.bio,
        birth_date: data?.profile
          ? convertGregorianToJalali(data?.profile?.birth_date as string)
          : "",
      });
    }
  }, [profileData, setValues]);

  return {
    profileData,
    profileFetching,
    register,
    handleSubmit,
    updateProfileFn,
    updateProfileLoading,
    control,
  };
}
