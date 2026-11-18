"use client";

import Image from "next/image";
import useMyArticleDetails from "@/hooks/useMyArticleDetails";
import ArticleContent from "@/components/modules/ShowArticleContent";
import { Button } from "@/components/common/Button";
import {
  Edit,
  FileText,
  MessageSquareText,
  Trash,
  UserRound,
} from "lucide-react";
import Modal from "@/components/common/Modal";
import toast from "react-hot-toast";
import ArticleDetailsSkeleton from "@/components/common/loading/ArticleDetailsSkeleton";

export default function MyArticleDetailsPage() {
  const {
    params,
    data,
    isFetching,
    comments,
    setOpen,
    open,
    router,
    deleteArticleLoading,
    deleteArticle,
  } = useMyArticleDetails();

  if (isFetching) return <ArticleDetailsSkeleton />;

  return (
    <section>
      <title>جزئیات مقاله | بلاگیفای</title>
      <meta
        name="description"
        content="جدیدترین و محبوب‌ترین مقالات بلاگیفای را کشف کنید."
      />

      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-4">
        <div className="col-span-full lg:col-span-4 order-2 md:order-1">
          <div className="mb-7 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-[0_4px_20px_rgba(109,40,217,0.04)]">
            <div className="h-12 w-1 shrink-0 rounded-full bg-primary" />

            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-box text-primary">
              <FileText className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-extrabold text-text-primary">
                جزئیات مقاله
              </h1>

              <p className="mt-1 text-xs text-text-secondary">
                مشاهده اطلاعات و مدیریت مقاله
              </p>
            </div>

            <span className="shrink-0 rounded-lg bg-box px-3 py-1.5 text-xs font-bold text-primary">
              #{params?.id}
            </span>
          </div>

          <Image
            src={
              data?.data?.cover_image
                ? process.env.NEXT_PUBLIC_SERVER_URL + data?.data?.cover_image
                : "/"
            }
            alt={data?.data?.title || ""}
            unoptimized
            width={1600}
            height={900}
            className="w-full rounded-xl mb-5"
          />

          <ArticleContent content={data?.data?.content ?? ""} />
        </div>

        <div className="order-1 md:order-2 col-span-full self-start rounded-2xl border border-border bg-card p-4 shadow-[0_8px_30px_rgba(109,40,217,0.05)] lg:col-span-2 lg:sticky lg:top-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-box p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-text-primary">
                اطلاعات مقاله
              </h3>
              <p className="mt-1 text-[11px] text-text-secondary">
                جزئیات و وضعیت انتشار
              </p>
            </div>
          </div>

          <div className="divide-y divide-border">
            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-xs text-text-secondary">وضعیت انتشار</span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  data?.data?.published_at
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {data?.data?.published_at ? "منتشر شده" : "پیش‌نویس"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-xs text-text-secondary">تاریخ انتشار</span>

              <span className="text-xs font-semibold text-text-primary">
                {data?.data?.published_at || "هنوز منتشر نشده"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-xs text-text-secondary">دسته‌بندی</span>

              <span className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
                {data?.data?.category?.name}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-xs text-text-secondary">ثبت نظر</span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  data?.data?.allow_comments
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {data?.data?.allow_comments ? "فعال" : "غیرفعال"}
              </span>
            </div>

            {data?.data?.allow_comments && (
              <div className="flex items-center justify-between gap-3 py-3">
                <span className="text-xs text-text-secondary">تعداد نظرات</span>

                <span className="text-xs font-bold text-text-primary">
                  {comments?.data?.data?.length ?? 0}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-xs text-text-secondary">تعداد بازدید</span>

              <span className="text-xs font-bold text-text-primary">
                {data?.data?.views_count ?? 0} بازدید
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 py-3">
              <span className="text-xs text-text-secondary">زمان مطالعه</span>

              <span className="text-xs font-bold text-text-primary">
                {data?.data?.reading_time ?? 0} دقیقه
              </span>
            </div>
          </div>

          <div className="mt-5 space-y-3 border-t border-border pt-5">
            <h4 className="mb-3 text-xs font-bold text-text-secondary">
              مدیریت مقاله
            </h4>

            <Button
              variant="outline"
              fullWidth
              className="min-h-11 rounded-xl!"
            >
              <Edit className="size-4.5" />
              ویرایش مقاله
            </Button>

            <Button
              variant="dangerOutline"
              fullWidth
              className="min-h-11 rounded-xl!"
              onClick={() => setOpen(true)}
            >
              <Trash className="size-4.5" />
              حذف مقاله
            </Button>
          </div>
        </div>

        <div className="order-3 md:order-3 col-span-full lg:col-span-4 mt-10">
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
            <div className="h-11 w-1 shrink-0 rounded-full bg-primary" />

            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-box text-primary">
              <MessageSquareText className="size-5" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-extrabold text-text-primary">
                نظرات کاربران
              </h2>
              <p className="mt-1 text-xs text-text-secondary">
                دیدگاه‌های ثبت‌شده برای این مقاله
              </p>
            </div>

            <span className="rounded-lg bg-box px-3 py-1.5 text-xs font-bold text-primary">
              {comments?.data?.data?.length ?? 0} نظر
            </span>
          </div>

          <div className="space-y-3">
            {comments?.data?.data?.length ? (
              comments.data.data.map((item) => (
                <div
                  key={item.id}
                  className="
            group rounded-xl border border-border
            bg-card p-4
            transition-all duration-300
            hover:border-violet-200
            hover:shadow-[0_8px_24px_rgba(109,40,217,0.06)]
          "
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-box bg-box">
                        {item.user?.profile?.avatar ? (
                          <Image
                            src={
                              process.env.NEXT_PUBLIC_SERVER_URL +
                              item.user.profile.avatar
                            }
                            alt={item.user.first_name}
                            width={40}
                            height={40}
                            unoptimized
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center text-primary">
                            <UserRound className="size-5" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-text-primary">
                          {item.user?.first_name} {item.user?.last_name}
                        </p>

                        {item.user?.profile?.user_name && (
                          <span className="text-xs text-text-secondary">
                            @{item.user.profile.user_name}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 text-[11px] text-text-secondary">
                      {item.createdAt}
                    </span>
                  </div>

                  <p className="mt-4 border-r-2 border-primary/20 pr-3 text-sm leading-7 text-text-primary">
                    {item.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-box/50 px-4 py-10 text-center">
                <MessageSquareText className="size-9 text-primary/40" />

                <p className="text-sm font-semibold text-text-primary">
                  هنوز نظری برای این مقاله ثبت نشده است
                </p>

                <p className="text-xs text-text-secondary">
                  اولین دیدگاه کاربران در این قسمت نمایش داده می‌شود.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="حذف مقاله"
        description="آیا از حذف مقاله خود اطمینان دارید؟"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>

            <Button
              variant="danger"
              onClick={() =>
                deleteArticle({ id: Number(params?.id) }).then(({ data }) => {
                  if (data?.isSuccess) {
                    toast.success(data?.message);
                    setOpen(false);
                    router.back();
                  }
                })
              }
              loading={deleteArticleLoading}
            >
              حذف مقاله
            </Button>
          </>
        }
      >
        <p>با حذف مقاله، این مقاله دیگر در دسترس نخواهد بود!</p>
      </Modal>
    </section>
  );
}
