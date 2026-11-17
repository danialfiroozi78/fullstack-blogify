"use client";

import Image from "next/image";
import useMyArticles from "@/hooks/useMyArticles";
import Link from "next/link";
import { ArrowUpLeft, BookOpen, CalendarDays } from "lucide-react";
import MyArticlesSkeleton from "@/components/common/loading/ArticleSkeletonLoading";

export default function MyArticlesPage() {
  const { myArticlesFetching, myArticlesData } = useMyArticles();

  return (
    <section>
      <div className="mb-10 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-4 shadow-[0_4px_20px_rgba(109,40,217,0.04)]">
        <div className="h-12 w-1 shrink-0 rounded-full bg-primary" />

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-box text-primary">
          <BookOpen className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <h1 className="text-lg font-extrabold text-text-primary">
            مقالات من
          </h1>

          <p className="text-xs text-text-secondary">
            مقاله‌های منتشرشده و پیش‌نویس‌های خود را مدیریت کنید.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myArticlesFetching ? (
          <MyArticlesSkeleton />
        ) : (
          myArticlesData?.data?.map((article) => (
            <Link
              href={`/profile/my-articles/details/${article.id}`}
              key={article.id}
              className="group block h-full"
            >
              <article
                className="
      flex h-full flex-col rounded-2xl
      border border-border bg-card p-3
      shadow-[0_8px_30px_rgba(65,35,120,0.05)]
      transition-all duration-300 ease-out
      hover:-translate-y-1.5
      hover:border-violet-300
      hover:shadow-[0_18px_45px_rgba(109,40,217,0.14)]
    "
              >
                <div className="relative aspect-video overflow-hidden rounded-xl bg-box">
                  <Image
                    src={
                      article.thumbnail_image
                        ? process.env.NEXT_PUBLIC_SERVER_URL +
                          article.thumbnail_image
                        : "/images/article-placeholder.webp"
                    }
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      article.published_at
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {article.published_at ? "منتشر شده" : "پیش‌نویس"}
                  </span>

                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-orange-800">
                    {article.category?.name}
                  </span>
                </div>

                <h3
                  className="
        mt-4 line-clamp-2 min-h-10
        text-sm font-extrabold leading-6
        text-text-primary
        transition-colors duration-300
        group-hover:text-primary
      "
                >
                  {article.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-xs leading-6 text-text-secondary">
                  {article.excerpt}
                </p>

                <div className="mt-auto pt-5">
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <CalendarDays className="h-3.5 w-3.5" />

                    <span>{article.published_at || "به‌زودی"}</span>
                  </div>

                  <div
                    className="
          mt-4 flex h-10 items-center justify-center gap-2
          rounded-xl border border-primary
          text-sm font-bold text-primary
          transition-all duration-300
          group-hover:border-primary
          group-hover:bg-primary group-hover:text-white
        "
                  >
                    مشاهده مقاله
                    <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
