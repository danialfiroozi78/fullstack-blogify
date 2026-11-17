"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/png/logo-lg.png";
import { ArrowUpLeft, Heart } from "lucide-react";

const quickLinks = [
  { title: "صفحه اصلی", href: "/" },
  { title: "مقالات", href: "/articles" },
  { title: "درباره ما", href: "/about-us" },
  { title: "تماس با ما", href: "/contact-us" },
];

const categories = [
  { title: "برنامه‌نویسی", href: "/categories/programming" },
  { title: "تکنولوژی", href: "/categories/technology" },
  { title: "هوش مصنوعی", href: "/categories/artificial-intelligence" },
  { title: "سبک زندگی", href: "/categories/lifestyle" },
];

export default function Footer() {
  return (
    <footer dir="rtl" className="mt-12">
      <div
        className="
          relative overflow-hidden rounded-2xl
          border border-primary/5 bg-footer
          px-5 py-8 sm:px-8 lg:px-10
        "
      >
        <div className="pointer-events-none absolute -left-20 -top-20 size-64 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative grid grid-cols-2 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-full md:col-span-2 lg:col-span-6">
            <Link href="/" className="inline-block">
              <Image
                src={Logo}
                alt="لوگو Blogify"
                className="h-auto w-40 sm:w-44"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-8 text-text-secondary">
              بلاگیفای جایی برای کشف ایده‌های جدید، یادگیری مهارت‌های کاربردی و
              به‌اشتراک‌گذاری دانش و تجربه است. همراه ما باشید و هر روز چیز
              تازه‌ای یاد بگیرید.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-base font-extrabold text-text-primary">
              دسترسی سریع
            </h3>

            <div className="mt-3 h-1 w-9 rounded-full bg-primary" />

            <nav className="mt-5 flex flex-col items-start gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group flex items-center gap-1.5
                    text-sm text-text-secondary
                    transition-all duration-200
                    hover:-translate-x-1 hover:text-primary
                  "
                >
                  <ArrowUpLeft className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-base font-extrabold text-text-primary">
              دسته‌بندی‌ها
            </h3>

            <div className="mt-3 h-1 w-9 rounded-full bg-accent" />

            <nav className="mt-5 flex flex-col items-start gap-3">
              {categories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group flex items-center gap-1.5
                    text-sm text-text-secondary
                    transition-all duration-200
                    hover:-translate-x-1 hover:text-primary
                  "
                >
                  <ArrowUpLeft className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div
        className="
          mt-2 flex flex-col items-center justify-center
          gap-2 rounded-xl bg-[#1E1538]
          px-4 py-3 text-center
          text-xs text-white/80
          sm:flex-row
        "
      >
        <span>تمام حقوق متعلق به بلاگیفای می‌باشد.</span>

        <span className="hidden text-white/30 sm:inline">|</span>

        <span className="flex items-center gap-1">
          ساخته‌شده با
          <Heart className="size-3.5 fill-red-400 text-red-400" />
          برای عاشقان یادگیری
        </span>
      </div>
    </footer>
  );
}
