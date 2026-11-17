"use client";

import { useRouter } from "next/navigation";

export default function useSearch() {
  const router = useRouter();

  return { router };
}
