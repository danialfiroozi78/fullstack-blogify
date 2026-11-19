"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/common/Input";
import { TextArea } from "@/components/common/Textarea";
import { Button } from "@/components/common/Button";
import { PenBoxIcon } from "lucide-react";
import { useAddCommentMutation } from "@/api/mutation/comment.mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddComment({
  isAuthenticated,
  id,
}: {
  isAuthenticated: boolean;
  id: number;
}) {
  const {
    register,
    handleSubmit,
    setValues,
    formState: { errors },
  } = useForm<{ content: string; guest_name?: string; guest_email?: string }>();

  const router = useRouter();

  const [addCommentMutation, { isLoading }] = useAddCommentMutation();

  const addComment: SubmitHandler<{
    content: string;
    guest_name?: string;
    guest_email?: string;
  }> = (data) => {
    addCommentMutation({ ...data, id }).then(({ data }) => {
      if (data?.isSuccess) {
        toast.success(data?.message);

        setValues({
          content: "",
          guest_name: "",
          guest_email: "",
        });

        router.refresh();
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {!isAuthenticated && (
        <>
          <Input
            label="نام و نام خانوادگی:"
            {...register("guest_name", {
              required: "این فیلد نمی تواند خالی بماند!",
            })}
            error={errors.guest_name?.message}
          />
          <Input
            label="ایمیل:"
            {...register("guest_email", {
              required: "این فیلد نمی تواند خالی بماند!",
            })}
            error={errors.guest_email?.message}
          />
        </>
      )}

      <div className="col-span-full">
        <TextArea
          label="متن نظر:"
          {...register("content", {
            required: "این فیلد نمی تواند خالی بماند!",
          })}
          error={errors.content?.message}
          placeholder="نظر خود را وارد کنید ..."
        />

        <div className="flex justify-end">
          <Button
            className="mr-auto w-full sm:w-fit"
            onClick={handleSubmit(addComment)}
            loading={isLoading}
          >
            <PenBoxIcon className="size-4.5" />
            ثبت نظر
          </Button>
        </div>
      </div>
    </div>
  );
}
