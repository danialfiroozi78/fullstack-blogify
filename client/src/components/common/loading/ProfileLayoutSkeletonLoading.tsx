"use client";

type ProfileSidebarSkeletonProps = {
  className?: string;
};

export default function ProfileSidebarSkeleton({
  className = "",
}: ProfileSidebarSkeletonProps) {
  return (
    <aside
      dir="rtl"
      role="status"
      aria-label="در حال بارگذاری سایدبار پروفایل"
      className={`flex min-h-115 flex-col rounded-xl bg-white p-5 lg:col-span-3 ${className}`}
    >
      <div className="animate-pulse">
        <div className="flex flex-col items-center gap-3 rounded-xl bg-violet-50 p-5">
          <div className="h-16 w-16 rounded-full bg-violet-200" />

          <div className="h-3 w-36 rounded bg-violet-200" />
        </div>

        <nav className="mt-5 space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`flex h-11 items-center gap-3 rounded-lg px-3 ${
                index === 2 ? "bg-violet-50" : ""
              }`}
            >
              <div className="h-5 w-5 rounded bg-gray-200" />

              <div className="h-3 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-8">
        <div className="h-11 w-full animate-pulse rounded-xl bg-red-50" />
      </div>

      <span className="sr-only">در حال دریافت اطلاعات کاربری...</span>
    </aside>
  );
}
