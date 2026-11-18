import Link from "next/link";
import {
  ArrowLeft,
  Flame,
  PenLine,
} from "lucide-react";
import {
  getCategories,
  getMoreVisitedArticles,
  getNewestArticles,
} from "@/utils/fetch";
import HeroSection from "@/components/modules/HeroSection.module";
import SectionHeading from "@/components/modules/SectionHeading.module";
import CategoriesSection from "@/components/modules/Categories.module";
import ArticleCard from "@/components/modules/ArticleCard.module";
import PopularArticleCard from "@/components/modules/PopularArticleCard.module";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "صفحه اصلی | بلاگیفای",
    description: "جدیدترین و محبوب‌ترین مقالات بلاگیفای را کشف کنید.",
};

export default async function HomePage() {
  const categories = await getCategories();
  const newestArticles = await getNewestArticles();
  const moreVisitedArticles = await getMoreVisitedArticles();

  return (
    <div dir="rtl" className="pb-10">
      <HeroSection />

      <section className="mt-16">
        <SectionHeading
          title="دسته‌بندی‌ها"
          description="موضوع مورد علاقه‌ات رو پیدا کن و شروع به یادگیری کن"
        />
        <CategoriesSection categories={categories} />
      </section>

      <section className="mt-16">
        <SectionHeading
          title="تازه‌ترین مقالات"
          description="جدیدترین نوشته‌ها و مطالب منتشرشده در بلاگیفای"
          href="/articles?sort=1"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {newestArticles?.data?.map((item) => (
            <ArticleCard key={item?.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-border bg-box px-5 py-8 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <Flame className="size-6" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-text-primary sm:text-2xl">
              محبوب‌ترین مقالات
            </h2>

            <p className="mt-1 text-xs text-text-secondary sm:text-sm">
              مطالبی که بیشتر مورد توجه کاربران قرار گرفتن
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {moreVisitedArticles?.data?.map((item) => (
            <PopularArticleCard key={item?.id} item={item} />
          ))}
        </div>
      </section>

      <section className="relative mt-16 overflow-hidden rounded-3xl bg-linear-to-br from-[#4c1d95] to-primary px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium">
              <PenLine className="size-4 text-orange-300" />
              نویسنده بلاگیفای شو
            </span>

            <h2 className="mt-5 text-2xl font-black leading-relaxed sm:text-3xl">
              داستان بعدی رو تو بنویس!
            </h2>

            <p className="mt-4 text-sm leading-8 text-white/80">
              تجربه‌ها و دانسته‌هات رو با دیگران به اشتراک بذار. شاید مقاله تو،
              شروع مسیر یادگیری یک نفر دیگه باشه.
            </p>
          </div>

          <Link
            href="/profile/new-article"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50"
          >
            شروع نویسندگی
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
