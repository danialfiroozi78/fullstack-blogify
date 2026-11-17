"use client";

import { useState } from "react";
import { useGetProfileQuery } from "@/api/query/profile.query";
import { useLogoutMutation } from "@/api/mutation/auth.mutation";
import { usePathname, useRouter } from "next/navigation";
import { BookIcon, PenBoxIcon, User2Icon } from "lucide-react";

export default function useProfileLayout() {
  const { replace, refresh } = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: profileData, isFetching: profileFetching } =
    useGetProfileQuery(null);

  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();

  const sidebarItems = [
    {
      title: "پروفایل",
      href: "/profile",
      icon: User2Icon,
    },
    {
      title: "ایجاد مقاله جدید",
      href: "/profile/new-article",
      icon: PenBoxIcon,
    },
    {
      title: "مقالات من",
      href: "/profile/my-articles",
      icon: BookIcon,
    },
  ];

  return {
    profileData,
    profileFetching,
    logoutMutation,
    logoutLoading,
    replace,
    refresh,
    pathname,
    open,
    setOpen,
    sidebarItems,
  };
}
