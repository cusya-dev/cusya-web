"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { Menu } from "lucide-react";
import { FadeText } from "@/components/fade-text";
import { useI18n } from "@/components/i18n-provider";
import { LangToggle } from "@/components/lang-toggle";
import { Logo } from "@/components/logo";
import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { tr } from "@/lib/locale";

// Menu mobile (dialog) dimuat terpisah supaya JS awal lebih kecil.
function MenuPlaceholder() {
  const { t } = useI18n();
  return (
    <Button variant="outline" size="sm" className="h-11 w-11 px-0 md:hidden" aria-label={t.nav.openMenu}>
      <Menu className="h-5 w-5" />
    </Button>
  );
}
const MobileMenu = dynamic(() => import("@/components/mobile-menu").then((mod) => mod.MobileMenu), { loading: () => <MenuPlaceholder /> });

export function Navbar() {
  const { locale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Satu listener scroll ringan: bayangan header + garis progres (tanpa re-render per frame).
  useEffect(() => {
    let raf = 0;
    let last = false;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      const s = y > 8;
      if (s !== last) {
        last = s;
        setScrolled(s);
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <m.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur transition-shadow ${scrolled ? "shadow-lg shadow-cusya-600/10" : ""}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <NavLink href="/#home" aria-label={t.nav.top} className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-extrabold tracking-tight">Cusya</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t.nav.main}>
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-cusya-600">
              <FadeText>{tr(l.label, locale)}</FadeText>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle />
          <Button asChild className="hidden md:inline-flex">
            <NavLink href="/#kontak"><FadeText>{t.nav.cta}</FadeText></NavLink>
          </Button>
          <MobileMenu />
        </div>
      </div>
      <div ref={bar} style={{ transform: "scaleX(0)" }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-cusya-400 to-sky-400 will-change-transform" />
    </m.header>
  );
}
