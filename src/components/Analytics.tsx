"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    goatcounter: {
      count: (options: { path: string; event: boolean }) => void;
    };
  }
}

function logGoatCounterPageview(url: string) {
  if (typeof window === "undefined") return;
  if (!window.goatcounter || !window.goatcounter.count) return;

  console.log(`Logging pageview for ${url}`);

  window.goatcounter.count({
    path: url,
    event: false,
  });
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    logGoatCounterPageview(pathname);
  }, [pathname]);

  return (
    <Script
      data-goatcounter="https://nobuti.goatcounter.com/count"
      data-goatcounter-settings='{"allow_local": true, "no_onload": true}'
      src="//gc.zgo.at/count.js"
      strategy="afterInteractive"
    />
  );
}
