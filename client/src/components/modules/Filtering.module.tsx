"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";

type Category = {
  id: number;
  name: string;
};

export default function ArticlesFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const search = String(formData.get("search") ?? "");
    const category = String(formData.get("category") ?? "");
    const sort = String(formData.get("sort") ?? "");

    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);

    router.push(`/articles?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5 border border-violet-100 bg-white rounded-xl mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <Input name="search" label="جستجو:" placeholder="دنبال چی میگردی؟!" />

        <Select name="category" label="دسته بندی ها:" options={categories} />

        <Select
          name="sort"
          label="مرتب سازی:"
          options={[
            { name: "جدیدترین", id: 1 },
            { name: "قدیمی‌ترین", id: 2 },
            { name: "پربازدیدترین", id: 3 },
          ]}
        />

        <div className="justify-end flex gap-2">
          <button
            className="text-sm font-medium duration-300 hover:text-primary cursor-pointer"
            onClick={() => router.push("/articles")}
          >
            پاک کردن فیلترها
          </button>
          <Button variant="outline" className="w-fit" type="submit">
            <Search className="size-5" />
            جستجو
          </Button>
        </div>
      </div>
    </form>
  );
}
