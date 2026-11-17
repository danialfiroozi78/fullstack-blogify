// app/not-found.tsx

import Link from "next/link";
import { House, FileSearch, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main
      dir="rtl"
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-body px-4 py-16"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
        {/* Icon */}
        <div className="relative mb-7">
          <div className="flex size-24 items-center justify-center rounded-3xl border border-border bg-white shadow-[0_15px_50px_rgba(109,40,217,0.08)]">
            <FileSearch size={42} strokeWidth={1.5} className="text-primary" />
          </div>

          <span className="absolute -top-2 -right-2 size-5 animate-pulse rounded-full border-4 border-body bg-accent" />
        </div>

        {/* 404 */}
        <div className="relative mb-5">
          <h1 className="bg-linear-to-l from-primary via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-[110px] leading-none font-black tracking-tight text-transparent select-none sm:text-[150px]">
            404
          </h1>

          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-accent" />
        </div>

        {/* Content */}
        <h2 className="mb-4 text-2xl font-bold text-text-primary sm:text-3xl">
          صفحه موردنظر پیدا نشد!
        </h2>

        <p className="mb-9 max-w-md text-sm leading-8 text-text-secondary sm:text-base">
          به نظر می‌رسه آدرس رو اشتباه وارد کردی، یا صفحه‌ای که دنبالش هستی حذف
          شده یا جابه‌جا شده. نگران نباش، می‌تونی از صفحه اصلی دوباره شروع کنی.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(109,40,217,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
          >
            <House size={18} />
            بازگشت به صفحه اصلی
          </Link>

          <Link
            href="/articles"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-6 text-sm font-semibold text-text-primary transition-all duration-300 hover:border-primary/30 hover:bg-box"
          >
            مشاهده مقالات
            <ArrowLeft size={18} />
          </Link>
        </div>

        {/* Footer Text */}
        <div className="mt-14 flex items-center gap-3 text-xs text-[#98a2b3]">
          <span className="h-px w-8 bg-border" />
          Blogify
          <span className="h-px w-8 bg-border" />
        </div>
      </div>
    </main>
  );
}
