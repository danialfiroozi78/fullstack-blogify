import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import HeroImage from "@/public/images/png/articles-hero.png";
import SectionHeading from "@/components/modules/SectionHeading.module";
import { getArticles, getCategories } from "@/utils/fetch";
import ArticlesFilters from "@/components/modules/Filtering.module";
import ArticlesEmptyState from "@/components/modules/EmptyState.module";
import ArticleCard from "@/components/modules/ArticleCard.module";

export const metadata: Metadata = {
  title: "مقالات | بلاگیفای",
  description: "جدیدترین و محبوب‌ترین مقالات بلاگیفای را کشف کنید.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  const categories = await getCategories();
  const articles = await getArticles(params);

  return (
    <section>
      <section
        dir="rtl"
        className="relative isolate flex min-h-45 items-center overflow-hidden rounded-2xl bg-linear-to-l from-[#54219c] via-[#762dd1] to-[#a855f7] px-6 py-8 sm:px-10 lg:min-h-55 lg:px-14"
      >
        <div className="pointer-events-none absolute -top-24 -left-16 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 size-72 rounded-full bg-primary/30 blur-3xl" />

        <div className="relative z-10 grid w-full items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm">
              <Sparkles className="size-3.5 text-orange-300" />
              دنیای مقالات بلاگیفای
            </span>

            <h1 className="mt-4 text-2xl font-black leading-relaxed text-white sm:text-3xl lg:text-4xl">
              کشف کن، بخون و <span className="text-[#ffae74]">یاد بگیر!</span>
            </h1>

            <p className="mt-3 max-w-lg text-xs leading-7 text-white/80 sm:text-sm">
              جدیدترین مقالات، تجربه‌ها و ایده‌های نویسندگان بلاگیفای رو کشف کن
              و هر روز چیز تازه‌ای یاد بگیر.
            </p>
          </div>

          <div className="relative mx-auto h-42.5 w-full max-w-87.5 md:h-50">
            <Image
              src={HeroImage}
              alt="مقالات و یادگیری در بلاگیفای"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 350px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section>
        <ArticlesFilters categories={categories} />
      </section>

      <section className="mt-8">
        <SectionHeading
          title="مقالات"
          description="هرچی که نمیدونی رو میتونی با ما بدونی ..."
          count={String(articles?.data?.length)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {!articles?.data?.length ? (
            <ArticlesEmptyState />
          ) : (
            articles?.data?.map((item) => (
              <ArticleCard key={item?.id} item={item} />
            ))
          )}
        </div>
      </section>
    </section>
  );
}
