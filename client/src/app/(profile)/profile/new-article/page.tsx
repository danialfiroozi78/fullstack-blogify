"use client";

import { Input } from "@/components/common/Input";
import useNewArticle from "@/hooks/useNewArticle";
import { Select } from "@/components/common/Select";
import { RadioGroup } from "@/components/common/RadioGroup";
import { MarkdownEditor } from "@/components/common/MarkdownEditor";
import { Button } from "@/components/common/Button";
import { BookOpen, Check } from "lucide-react";
import { Controller } from "react-hook-form";
import { FileInput } from "@/components/common/InputFile";

export default function NewArticlePage() {
  const {
    register,
    handleSubmit,
    errors,
    categories,
    control,
    createArticle,
    createArticleLoading,
  } = useNewArticle();

  return (
    <section>
      <title>ایجاد مقاله | بلاگیفای</title>
      <meta
        name="description"
        content="جدیدترین و محبوب‌ترین مقالات بلاگیفای را کشف کنید."
      />

      <div className="mb-10 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 shadow-[0_4px_20px_rgba(109,40,217,0.04)]">
        <div className="h-12 w-1 shrink-0 rounded-full bg-primary" />

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-box text-primary">
          <BookOpen className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h1 className="text-lg font-extrabold text-text-primary">
            ایجاد مقاله جدید
          </h1>

          <p className="text-xs text-text-secondary">
            میتوانید مقاله جدیدی منتشر کنید تا همه از علم شما استفاده کنند!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        <div className="col-span-full">
          <Input
            label="موضوع:"
            {...register("title", {
              required: "این فیلد نمی تواند خالی باشد!",
            })}
            helperText="حداکثر 255 کاراکتر"
            error={errors.title?.message}
          />
        </div>
        <div className="col-span-full">
          <Input
            label="توضیح کوتاه:"
            {...register("excerpt", {
              required: "این فیلد نمی تواند خالی باشد!",
            })}
            helperText="حداکثر 1000 کاراکتر"
            error={errors.excerpt?.message}
          />
        </div>
        <Select
          label="دسته‌بندی مقاله:"
          placeholder="انتخاب کنید"
          options={categories}
          error={errors.category_id?.message}
          required
          {...register("category_id", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
            required: "انتخاب دسته‌بندی الزامی است",
          })}
        />
        <RadioGroup
          label="وضعیت انتشار مقاله:"
          options={[
            {
              label: "پیش‌نویس",
              value: "draft",
            },
            {
              label: "انتشار",
              value: "published",
            },
          ]}
          error={errors.status?.message}
          control={control}
          rules={{
            required: "لطفاً وضعیت ثبت نظرات را مشخص کنید",
          }}
          name="status"
        />
        <RadioGroup
          label="امکان ثبت نظر:"
          options={[
            {
              label: "فعال",
              value: "true",
            },
            {
              label: "غیر فعال",
              value: "false",
            },
          ]}
          name="allow_comments"
          error={errors.allow_comments?.message}
          control={control}
          rules={{
            required: "لطفاً وضعیت ثبت نظرات را مشخص کنید",
          }}
        />
        <div className="col-span-full">
          <Controller
            name="cover_image"
            control={control}
            render={({ field, fieldState }) => (
              <FileInput
                label="تصویر کارت مقاله:"
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
        <div className="col-span-full">
          <Controller
            name="thumbnail_image"
            control={control}
            render={({ field, fieldState }) => (
              <FileInput
                label="تصویر اصلی مقاله:"
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
        <div className="col-span-full">
          <MarkdownEditor
            name="content"
            control={control}
            label="محتوای مقاله:"
            error={errors.content?.message}
            rules={{
              required: "محتوای مقاله الزامی است",
              minLength: {
                value: 20,
                message: "محتوای مقاله باید حداقل ۲۰ کاراکتر باشد",
              },
            }}
          />
        </div>

        <div className="text-left col-span-full">
          <Button
            onClick={handleSubmit(createArticle)}
            loading={createArticleLoading}
            className="w-full sm:w-fit"
          >
            <Check className="size-5" />
            ایجاد مقاله
          </Button>
        </div>
      </div>
    </section>
  );
}
