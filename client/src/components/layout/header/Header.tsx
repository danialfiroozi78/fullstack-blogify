import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import Logo from "@/public/images/png/logo-lg.png";
import SearchBox from "@/components/modules/search.module";
import { getCategories } from "@/utils/fetch";
import MobileMenu from "@/components/layout/header/MobileMenu";

export default async function Header() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has("access_token");
  const categories = await getCategories();

  const linkClass = `
    relative py-2 text-[15px] font-medium text-text-primary
    transition-colors duration-300 hover:text-primary
    after:absolute after:bottom-0 after:right-0
    after:h-0.5 after:w-0 after:rounded-full
    after:bg-primary after:transition-all after:duration-300
    hover:after:w-full
  `;

  return (
    <header className="relative z-50">
      <div
        className="
          mb-8 mt-5 flex min-h-16 items-center
          justify-between gap-3 rounded-2xl
          border border-border/60 bg-header px-3
          shadow-[0_8px_30px_rgba(109,40,217,0.06)]
          sm:px-4 lg:mb-10
        "
      >
        <div className="flex min-w-0 items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <MobileMenu categories={categories ?? []} />
            </div>
            <Link href="/" className="shrink-0">
              <Image src={Logo} alt="لوگو Blogify" width={130} height={900} />
            </Link>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link href="/" className={linkClass}>
              صفحه اصلی
            </Link>

            <div className="group relative">
              <Link
                href="/categories"
                className={`${linkClass} flex items-center gap-1`}
              >
                دسته‌بندی‌ها
                <ChevronDown className="size-4 transition-transform duration-300 group-hover:rotate-180" />
              </Link>

              <div
                className="
                  invisible absolute right-0 top-full z-50
                  w-52 pt-3 opacity-0
                  transition-all duration-200
                  group-hover:visible group-hover:opacity-100
                  group-focus-within:visible
                  group-focus-within:opacity-100
                "
              >
                <div className="rounded-xl border border-border bg-white p-2 shadow-[0_12px_35px_rgba(109,40,217,0.12)]">
                  {categories?.map((item) => (
                    <Link
                      key={item.id}
                      href={`/articles?category=${item?.id}`}
                      className="
                        block rounded-lg px-3 py-2.5
                        text-sm text-text-primary
                        transition-colors duration-200
                        hover:bg-box hover:text-primary
                      "
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/articles" className={linkClass}>
              مقالات
            </Link>

            <Link href="/about-us" className={linkClass}>
              درباره ما
            </Link>

            <Link href="/contact-us" className={linkClass}>
              تماس با ما
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <SearchBox isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}
