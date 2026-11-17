"use client";

export default function ProfileFormSkeleton() {
  return (
    <div
      dir="rtl"
      role="status"
      aria-label="در حال بارگذاری اطلاعات پروفایل"
      className="rounded-xl bg-white p-5"
    >
      <div className="animate-pulse space-y-7">
        <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-3">
          {[
            "نام",
            "نام خانوادگی",
            "شماره موبایل",
            "نام کاربری",
            "ایمیل",
            "وب‌سایت",
            "تاریخ تولد",
          ].map((field) => (
            <div key={field} className="space-y-2">
              <div className="h-3 w-20 rounded bg-gray-200" />

              <div className="h-11 w-full rounded-xl border border-violet-100 bg-gray-50" />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="h-3 w-20 rounded bg-gray-200" />

          <div className="h-36 w-full rounded-xl border border-violet-100 bg-gray-50" />

          <div className="mr-auto h-3 w-44 rounded bg-gray-100" />
        </div>

        <div className="space-y-3">
          <div className="h-3 w-28 rounded bg-gray-200" />

          <div className="flex h-44 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-violet-100">
            <div className="h-12 w-12 rounded-full bg-violet-100" />

            <div className="h-3 w-44 rounded bg-gray-200" />

            <div className="h-3 w-32 rounded bg-gray-100" />

            <div className="h-3 w-40 rounded bg-gray-100" />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <div className="h-11 w-32 rounded-xl bg-violet-200" />
        </div>
      </div>

      <span className="sr-only">در حال دریافت اطلاعات حساب کاربری...</span>
    </div>
  );
}
