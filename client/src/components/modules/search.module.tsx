"use client";

import { Button } from "../common/Button";
import useSearch from "@/hooks/useSearch";
import { UserCircle2Icon } from "lucide-react";

export default function SearchBox({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const { router } = useSearch();

  return (
    <div className="flex items-center gap-3">
      {/*<Input placeholder="جستجو کنید ..." />*/}
      {isAuthenticated ? (
        <Button onClick={() => router.push("/profile")}>
          <UserCircle2Icon className="size-5" />
          پروفایل
        </Button>
      ) : (
        <Button onClick={() => router.push("/auth")}>ورود | ثبت نام</Button>
      )}
    </div>
  );
}
