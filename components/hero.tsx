"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { HeroMascot } from "@/components/hero-mascot";
import { NavLink } from "@/components/nav-link";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { stats } from "@/lib/data";
import { tr } from "@/lib/locale";

function RotatingWord() {
  const { t } = useI18n();
  const words = t.hero.rotating;
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(timer);
  }, [reduce, words.length]);
  return (
    <span className="relative inline-flex h-10 min-w-[11rem] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cusya-600 to-cusya-500 px-4 text-lg font-bold text-white shadow-lg shadow-cusya-600/30 sm:h-11 sm:text-xl">
      <AnimatePresence mode="wait">
        <m.span key={`${i}-${words[0]}`} initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }} transition={{ duration: 0.35 }}>
          {words[i % words.length]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { locale, t } = useI18n();
  const item = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay: d },
  });

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-cusya-100 via-cusya-50 to-white">
      <div aria-hidden className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(147,188,245,0.55),transparent_68%)] will-change-transform" />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-32 h-80 w-80 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.55),transparent_68%)] will-change-transform [animation-delay:3s]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 text-center sm:gap-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24 lg:text-left">
        <div>
          <m.p {...item(0)} className="text-xs font-semibold tracking-[0.3em] text-cusya-400 sm:text-sm">{t.hero.welcome}</m.p>
          <m.h1 {...item(0.1)} className="relative mt-1 inline-block text-6xl font-extrabold tracking-tighter sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-cusya-800 via-cusya-600 to-sky-500 bg-clip-text pb-1 text-transparent">Cusya</span>
            <svg aria-hidden viewBox="0 0 220 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-sky-400">
              <m.path
                d="M2 9 Q 30 1 58 8 T 114 8 T 170 8 T 218 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
          </m.h1>
          <m.div {...item(0.2)} className="mt-5 flex flex-wrap items-center justify-center gap-3 text-lg font-bold lg:justify-start">
            <span>{t.hero.homeOf}</span>
            <RotatingWord />
          </m.div>
          <m.p {...item(0.3)} className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg lg:mx-0">
            {t.hero.text}
          </m.p>

          <m.dl {...item(0.4)} className="mt-6 grid grid-cols-[1fr_1.3fr_1fr] gap-2 rounded-2xl border bg-white/80 p-3 text-center shadow-lg shadow-cusya-600/10 sm:mt-8 sm:p-4">
            {stats.map((s) => (
              <div key={s.label.en}>
                <dt className={`whitespace-nowrap text-lg font-extrabold sm:text-2xl ${s.accent ? "text-cusya-600" : ""}`}>
                  {s.text ? tr(s.text, locale) : <CountUp to={s.to ?? 0} suffix={s.suffix ? tr(s.suffix, locale) : ""} />}
                </dt>
                <dd className="mt-1 text-xs font-medium text-cusya-500 sm:text-sm">{tr(s.label, locale)}</dd>
              </div>
            ))}
          </m.dl>

          <m.div {...item(0.5)} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="sm:flex-1">
              <NavLink href="/#layanan"><ShoppingBag className="h-5 w-5" />{t.hero.browse}</NavLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="sm:flex-1">
              <NavLink href="/#kontak"><MessageCircle className="h-5 w-5" />{t.hero.contact}</NavLink>
            </Button>
          </m.div>
        </div>

        <HeroMascot />
      </div>
    </section>
  );
}
