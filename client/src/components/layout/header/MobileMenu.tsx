"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  House,
  BookOpen,
  Info,
  Phone,
  LayoutGrid,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type MobileMenuProps = {
  categories: Category[];
};

const menuItems = [
  { title: "صفحه اصلی", href: "/", icon: House },
  { title: "مقالات", href: "/articles", icon: BookOpen },
  { title: "درباره ما", href: "/about-us", icon: Info },
  { title: "تماس با ما", href: "/contact-us", icon: Phone },
];

export default function MobileMenu({ categories }: MobileMenuProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        aria-expanded={isOpen}
        aria-controls="blogify-mobile-menu"
        className="
          flex size-10 items-center justify-center
          rounded-xl bg-box text-primary
          transition-colors hover:bg-primary-light
        "
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {isOpen && (
        <nav
          id="blogify-mobile-menu"
          aria-label="منوی موبایل"
          dir="rtl"
          className="
            absolute right-0 top-full z-50 mt-2
            w-full rounded-2xl border border-border
            bg-white p-3
            shadow-[0_16px_45px_rgba(109,40,217,0.12)]
            lg:hidden
          "
        >
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 rounded-xl px-4 py-3
                text-sm font-medium transition-colors
                ${
                  pathname === "/"
                    ? "bg-box text-primary"
                    : "text-text-primary hover:bg-box hover:text-primary"
                }
              `}
            >
              <House className="size-5" />
              صفحه اصلی
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                aria-expanded={categoriesOpen}
                className="
                  flex w-full items-center justify-between
                  rounded-xl px-4 py-3 text-sm font-medium
                  text-text-primary transition-colors
                  hover:bg-box hover:text-primary
                "
              >
                <span className="flex items-center gap-3">
                  <LayoutGrid className="size-5" />
                  دسته‌بندی‌ها
                </span>

                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoriesOpen && (
                <div className="mr-5 mt-1 flex flex-col gap-1 border-r-2 border-primary/20 pr-3">
                  <Link
                    href="/categories"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-primary hover:bg-box"
                  >
                    همه دسته‌بندی‌ها
                  </Link>

                  {categories.map((item) => (
                    <Link
                      key={item.id}
                      href={`/categories/${item.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="
                        rounded-lg px-3 py-2 text-sm
                        text-text-secondary
                        transition-colors
                        hover:bg-box hover:text-primary
                      "
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {menuItems.slice(1).map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 rounded-xl
                    px-4 py-3 text-sm font-medium
                    transition-colors
                    ${
                      active
                        ? "bg-box text-primary"
                        : "text-text-primary hover:bg-box hover:text-primary"
                    }
                  `}
                >
                  <Icon className="size-5" />
                  {item.title}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}
