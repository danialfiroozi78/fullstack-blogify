import Link from "next/link";
import { FileSearch, RefreshCw } from "lucide-react";

type ArticlesEmptyStateProps = {
  hasFilters?: boolean;
};

export default function ArticlesEmptyState({
  hasFilters = false,
}: ArticlesEmptyStateProps) {
  return (
    <div
      dir="rtl"
      className="col-span-full flex min-h-75 w-full flex-col items-center justify-center rounded-2xl border border-border bg-white px-5 py-10 text-center"
    >
      <div className="mb-5 flex size-20 items-center justify-center rounded-2xl bg-box">
        <FileSearch size={36} strokeWidth={1.5} className="text-primary" />
      </div>

      <h3 className="mb-3 text-lg font-bold text-text-primary">
        مقاله‌ای پیدا نشد!
      </h3>

      <p className="max-w-md text-sm leading-7 text-text-secondary">
        {hasFilters
          ? "متأسفانه مقاله‌ای مطابق با فیلترهای انتخاب‌شده پیدا نکردیم. می‌تونی فیلترها رو تغییر بدی یا پاک کنی."
          : "هنوز مقاله‌ای منتشر نشده است. به‌زودی مطالب جدیدی اینجا قرار می‌گیرند."}
      </p>

      <Link
        href="/articles"
        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_8px_20px_rgba(109,40,217,0.18)]"
      >
        <RefreshCw size={17} />
        پاک کردن فیلترها
      </Link>
    </div>
  );
}
