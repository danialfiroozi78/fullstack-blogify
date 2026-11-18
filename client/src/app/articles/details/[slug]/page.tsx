import Image from "next/image";
import { getArticleDetails } from "@/utils/fetch";
import ArticleContent from "@/components/modules/ShowArticleContent";
import { Book, CalendarDays, Eye } from "lucide-react";
import ShowComments from "@/components/modules/ShowComments.module";
import type { Metadata } from "next";
import Avatar from "@/public/images/png/avatar.png";

export const metadata: Metadata = {
  title: "مقالات | بلاگیفای",
  description: "جدیدترین و محبوب‌ترین مقالات بلاگیفای را کشف کنید.",
};

export default async function ArticleDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleDetails(slug);

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white p-5 rounded-xl">
        <div className="col-span-full">
          <Image
            src={
              article?.data?.cover_image
                ? process.env.NEXT_PUBLIC_SERVER_URL +
                  article?.data?.cover_image
                : "/images/article-placeholder.webp"
            }
            alt={article?.data?.title}
            unoptimized
            width="1600"
            height="900"
            className="rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-105 mb-5"
          />
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
              <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
                <Image
                  src={
                    article?.data?.author?.profile?.avatar
                      ? process.env.NEXT_PUBLIC_SERVER_URL +
                        article?.data?.author?.profile?.avatar
                      : Avatar
                  }
                  alt={article?.data?.author?.first_name}
                  unoptimized
                  width="35"
                  height="35"
                  className="rounded-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <span>
                  {`${article?.data?.author.first_name} ${article?.data?.author.last_name}` ||
                    "ناشناس"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>انتشار: {article?.data?.published_at || "به‌زودی"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
                <Eye className="h-3.5 w-3.5" />
                <span>تعداد بازدید: {article?.data?.views_count}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
                <Book className="h-3.5 w-3.5" />
                <span>زمان مطالعه: {article?.data?.reading_time} دقیقه</span>
              </div>
            </div>
          </div>
          <ArticleContent content={article?.data?.content ?? ""} />
        </div>
      </div>

      <ShowComments article={article} />
    </section>
  );
}
