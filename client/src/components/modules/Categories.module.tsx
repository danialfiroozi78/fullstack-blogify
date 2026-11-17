// components/home/CategoriesSection.tsx

import Link from "next/link";
import {
  Code2,
  BrainCircuit,
  Cpu,
  PanelsTopLeft,
  ShieldCheck,
  ArrowUpLeft,
  type LucideIcon,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type CategoryStyle = {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  hoverBg: string;
};

const categoryStyles: Record<string, CategoryStyle> = {
  programming: {
    icon: Code2,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    hoverBg: "hover:bg-violet-50",
  },
  ai: {
    icon: BrainCircuit,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    hoverBg: "hover:bg-purple-50",
  },
  technology: {
    icon: Cpu,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    hoverBg: "hover:bg-blue-50",
  },
  webDesign: {
    icon: PanelsTopLeft,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    hoverBg: "hover:bg-orange-50",
  },
  security: {
    icon: ShieldCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    hoverBg: "hover:bg-emerald-50",
  },
};

const defaultStyle: CategoryStyle = {
  icon: Code2,
  iconBg: "bg-violet-100",
  iconColor: "text-violet-600",
  hoverBg: "hover:bg-violet-50",
};

export default function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section dir="rtl">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => {
          const style = categoryStyles[category.slug] ?? defaultStyle;
          const Icon = style.icon;

          return (
            <Link
              key={category.id}
              href={`/articles?category=${category.id}`}
              className={`
                group relative flex min-h-24 items-end
                justify-between gap-3 overflow-hidden
                rounded-2xl border border-border bg-white
                p-4 transition-all duration-300
                hover:-translate-y-1
                hover:border-primary/30
                hover:shadow-[0_12px_30px_rgba(109,40,217,0.08)]
                ${style.hoverBg}
              `}
            >
              <div className="relative z-10">
                <div
                  className={`
                    flex size-12 mb-5 shrink-0 items-center justify-center
                    rounded-xl transition-transform duration-300
                    group-hover:scale-110
                    ${style.iconBg}
                  `}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.8}
                    className={style.iconColor}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-text-primary">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-text-secondary">
                    مشاهده مقالات
                  </p>
                </div>
              </div>

              <div
                className="
                  relative z-10 flex size-8 shrink-0
                  items-center justify-center rounded-full
                  bg-box text-primary
                  transition-all duration-300
                  group-hover:bg-primary group-hover:text-white
                "
              >
                <ArrowUpLeft size={16} />
              </div>

              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-right scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
