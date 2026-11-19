import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, CalendarDays, PenBox } from "lucide-react";
import { GetArticlesResType } from "@/types/query.type";
import Placeholder from "@/public/images/png/article-placeholder.png";

export default function ArticleCard({
  item,
}: {
  item: GetArticlesResType["data"]["0"];
}) {
  return (
    <Link
      href={`articles/details/${item.slug}`}
      key={item.id}
      className="group block h-full"
    >
      <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-3 shadow-[0_8px_30px_rgba(65,35,120,0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-[0_18px_45px_rgba(109,40,217,0.14)]">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-box">
          <Image
            src={
              item.thumbnail_image
                ? process.env.NEXT_PUBLIC_SERVER_URL + item.thumbnail_image
                : Placeholder
            }
            alt={item.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL="/images/png/article-placeholder.png"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
              item.published_at
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {item.published_at ? "منتشر شده" : "پیش‌نویس"}
          </span>

          <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-bold text-orange-800">
            {item.category?.name}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-2 min-h-10 text-sm font-extrabold leading-6 text-text-primary transition-colors duration-300 group-hover:text-primary">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs leading-6 text-text-secondary">
          {item.excerpt}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <CalendarDays className="h-3.5 w-3.5" />

              <span>{item.published_at || "به‌زودی"}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <PenBox className="h-3.5 w-3.5" />

              <span>
                {`${item.author.first_name} ${item.author.last_name}` ||
                  "ناشناس"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex h-10 items-center justify-center gap-2 rounded-xl border border-primary text-sm font-bold text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
            مشاهده مقاله
            <ArrowUpLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
