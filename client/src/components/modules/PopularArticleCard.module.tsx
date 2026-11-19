import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, Eye, Flame } from "lucide-react";
import { GetArticlesResType } from "@/types/query.type";
import Placeholder from "@/public/images/png/article-placeholder.png";

export default function PopularArticleCard({
  item,
}: {
  item: GetArticlesResType["data"]["0"];
}) {
  return (
    <Link
      href={`/articles/details/${encodeURIComponent(item.slug)}`}
      className="group relative block h-80 overflow-hidden rounded-3xl bg-[#21133d] sm:h-87.5"
    >
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

      <div className="absolute inset-0 bg-linear-to-t from-[#160d2c] via-[#160d2c]/65 to-[#160d2c]/10" />

      <div dir="rtl" className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-center justify-between">
          <span className="mb-3 inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {item.category.name}
          </span>
          <div className="absolute top-5 left-5 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white">
            <Flame size={14} />
            محبوب
          </div>
        </div>

        <h3 className="line-clamp-2 text-xl leading-9 font-black text-white transition-colors group-hover:text-[#ffb36b]">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/70">
          {item.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Eye size={16} />
            <span>{item.views_count.toLocaleString("fa-IR")} بازدید</span>
          </div>

          <div className="flex size-9 items-center justify-center rounded-full bg-white text-primary transition-all duration-300 group-hover:-translate-x-1 group-hover:bg-accent group-hover:text-white">
            <ArrowUpLeft size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}
