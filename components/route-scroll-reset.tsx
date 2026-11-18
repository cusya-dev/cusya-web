"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Pindah halaman (mis. dari footer) selalu mulai dari atas, kecuali tujuan punya #bagian.
export function RouteScrollReset() {
  const pathname = usePathname();
  const prev = useRef(pathname);
  useEffect(() => {
    if (prev.current === pathname) return;
    prev.current = pathname;
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
