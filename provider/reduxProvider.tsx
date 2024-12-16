"use client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import QueryProvider from "@/provider/queryProvider";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
}
