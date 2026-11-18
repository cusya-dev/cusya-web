"use client";
import { useEffect, useRef } from "react";

// Hitung naik ringan (tanpa library): mulai saat terlihat di layar, hormati reduced motion.
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = (v: number) => {
      el.textContent = `${Math.round(v)}${suffix}`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show(to);
      return;
    }
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 1400, 1);
        show(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        run();
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, suffix]);
  return <span ref={ref}>{`0${suffix}`}</span>;
}
