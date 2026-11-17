"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SectionHeading({
  title,
  description,
  href,
  count,
}: {
  title: string;
  description: string;
  count?: string;
  href?: string;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="h-12 w-1 shrink-0 rounded-full bg-primary" />

        <div>
          <h2 className="text-xl font-extrabold text-text-primary sm:text-2xl">
            {title}
          </h2>
          <p className="mt-1 text-xs text-text-secondary sm:text-sm">
            {description}
          </p>
        </div>
      </div>

      {href && (
        <Link
          href={href}
          className="group flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-hover"
        >
          مشاهده همه
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        </Link>
      )}
      {count && (
        <small className="font-semibold text-sm rounded-full px-2 py-0.5 bg-primary/10 text-primary">
          {count} مقاله پیدا شد{" "}
        </small>
      )}
    </div>
  );
}
