"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { Mascot } from "@/components/mascot";
import { NavLink } from "@/components/nav-link";

const chips = [
  { c: "left-0 top-6", d: "0s" },
  { c: "right-0 top-1/3", d: "1.2s" },
  { c: "bottom-4 left-4", d: "2.4s" },
];

const sparks = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return { x: Math.cos(a) * 110, y: Math.sin(a) * 110 };
});

export function HeroMascot() {
  const { t } = useI18n();
  const [clicks, setClicks] = useState(0);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  function tap() {
    setClicks((c) => c + 1);
    setOpen(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 4500);
  }

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative mx-auto w-full max-w-xs sm:max-w-sm"
    >
      <div aria-hidden className="absolute left-1/2 top-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cusya-200 to-sky-200 opacity-80" />

      <div className="relative animate-float will-change-transform">
        <m.button
          type="button"
          onClick={tap}
          aria-label={t.mascot.aria}
          whileHover={{ rotate: 5, scale: 1.04 }}
          whileTap={{ scale: 0.94, rotate: -4 }}
          transition={{ type: "spring", stiffness: 250, damping: 12 }}
          className="block w-full cursor-pointer rounded-3xl"
        >
          <Mascot eager className="w-full drop-shadow-[0_20px_30px_rgba(47,85,157,0.3)]" />
        </m.button>
        {clicks > 0 &&
          sparks.map((s, i) => (
            <m.span
              key={`${clicks}-${i}`}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -ml-2.5 -mt-2.5 text-sky-400"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
              animate={{ x: s.x, y: s.y, opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Sparkles className="h-5 w-5" />
            </m.span>
          ))}
      </div>

      {chips.map((c, i) => (
        <span
          key={c.c}
          aria-hidden
          style={{ animationDelay: c.d }}
          className={`pointer-events-none absolute ${c.c} animate-float rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-cusya-700 shadow-lg shadow-cusya-600/20`}
        >
          {t.mascot.chips[i]}
        </span>
      ))}

      <AnimatePresence>
        {clicks === 0 && (
          <m.span
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 animate-pulse rounded-full bg-cusya-600 px-3 py-1 text-xs font-bold text-white shadow-md"
          >
            {t.mascot.hint}
          </m.span>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute -top-16 left-1/2 z-20 w-64 -translate-x-1/2">
        <AnimatePresence>
          {open && (
            <m.div
              role="status"
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="pointer-events-auto relative origin-bottom rounded-2xl border bg-white p-4 text-left shadow-xl shadow-cusya-600/20"
            >
              <m.p key={clicks} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-semibold leading-relaxed">
                {t.mascot.messages[Math.max(clicks - 1, 0) % t.mascot.messages.length]}
              </m.p>
              <NavLink href="/#layanan" className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-cusya-600 hover:text-cusya-700">
                <ShoppingBag className="h-4 w-4" />{t.mascot.link}
              </NavLink>
              <span aria-hidden className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r bg-white" />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}
