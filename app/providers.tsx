"use client";

import { Analytics } from "@vercel/analytics/react";
import { Analytics as DubAnalytics } from "@dub/analytics/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DubAnalytics />
      {children}
      <Analytics />
    </>
  );
}
