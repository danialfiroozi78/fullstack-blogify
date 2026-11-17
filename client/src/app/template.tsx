"use client";

import { store } from "@/lib/redux/store";
import { Provider } from "react-redux";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
