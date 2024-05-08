"use client";

import { Analytics } from "@vercel/analytics/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Analytics as DubAnalytics } from "@dub/analytics/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const dclid = searchParams.get("dclid");
    if (dclid) {
      // set cookie
      document.cookie = `dclid=${dclid}; path=/; max-age=31536000`;
    }
  }, [searchParams]);

  return (
    <>
      {children}
      <Analytics />
      <DubAnalytics apiKey="test" />
    </>
  );
}
