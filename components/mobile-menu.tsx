"use client";
import { useRef, useState } from "react";
import { m } from "framer-motion";
import { Menu } from "lucide-react";
import { FadeText } from "@/components/fade-text";
import { useI18n } from "@/components/i18n-provider";
import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { tr } from "@/lib/locale";

export function MobileMenu() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const navigating = useRef(false);
  const close = () => {
    navigating.current = true; // menutup karena pindah bagian: fokus tidak perlu dikembalikan ke tombol
    setOpen(false);
  };
  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (v) navigating.current = false;
        setOpen(v);
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-11 w-11 px-0 md:hidden" aria-label={t.nav.openMenu}>
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent onCloseAutoFocus={(e) => navigating.current && e.preventDefault()}>
        <SheetTitle className="text-xs font-bold tracking-widest text-cusya-400">{t.nav.menu}</SheetTitle>
        <ul className="mt-8 divide-y border-y">
          {navLinks.map((l, i) => (
            <m.li key={l.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
              <NavLink href={l.href} closeMenu={close} className="flex items-start gap-1 py-5 text-lg font-semibold">
                <FadeText>{tr(l.label, locale)}</FadeText>
                {l.badge && <sup className="text-[10px] font-bold text-cusya-600">{l.badge}</sup>}
              </NavLink>
            </m.li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-auto w-full">
          <NavLink href="/#kontak" closeMenu={close}><FadeText>{t.nav.cta}</FadeText></NavLink>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
