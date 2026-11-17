"use client";

type MyArticlesSkeletonProps = {
  count?: number;
};

export default function MyArticlesSkeleton({
  count = 3,
}: MyArticlesSkeletonProps) {
  return (
    <section
      dir="rtl"
      role="status"
      aria-label="در حال بارگذاری مقالات"
      className="min-h-112.5 rounded-xl bg-white p-5 lg:col-span-full"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-xl border border-violet-100 bg-white p-2"
          >
            <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-3 flex items-center justify-between gap-2">
              <div className="h-5 w-20 animate-pulse rounded-full bg-green-100" />
              <div className="h-5 w-24 animate-pulse rounded-full bg-orange-100" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="mt-auto flex items-center gap-2 pt-5">
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="mt-4 h-10 w-full animate-pulse rounded-lg bg-violet-100" />
          </div>
        ))}
      </div>

      <span className="sr-only">در حال دریافت مقالات شما...</span>
    </section>
  );
}
