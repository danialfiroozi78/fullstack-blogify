"use client";

export default function ArticleDetailsSkeleton() {
  return (
    <div
      dir="rtl"
      role="status"
      aria-label="در حال بارگذاری جزئیات مقاله"
      className="rounded-xl bg-white p-5"
    >
      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-6">
        <div className="min-w-0 space-y-7 lg:col-span-4">
          <div className="flex h-12 items-center justify-between rounded-xl bg-gray-50 px-4">
            <div className="h-5 w-36 animate-pulse rounded-md bg-gray-200" />
          </div>

          <div className="aspect-video w-full animate-pulse rounded-xl bg-gray-200" />

          <div className="space-y-3">
            <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="h-8 w-4/5 animate-pulse rounded-lg bg-gray-200" />
          </div>

          <div className="space-y-5 pt-3">
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="space-y-3 pt-4">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-10/12 animate-pulse rounded bg-gray-100" />
            </div>

            <div className="h-7 w-3/4 animate-pulse rounded-lg bg-gray-200" />

            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        </div>

        <aside className="rounded-xl border border-violet-100 p-3 lg:col-span-2">
          <div className="divide-y divide-gray-100">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="flex min-h-10 items-center justify-between gap-3 py-3"
              >
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                <div
                  className={`h-4 animate-pulse rounded bg-gray-100 ${
                    index === 0 || index === 3
                      ? "w-16"
                      : index === 2
                        ? "w-24"
                        : "w-20"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-11 w-full animate-pulse rounded-xl bg-violet-100" />
            <div className="h-11 w-full animate-pulse rounded-xl bg-red-50" />
          </div>
        </aside>
      </div>

      <span className="sr-only">در حال دریافت اطلاعات مقاله...</span>
    </div>
  );
}
