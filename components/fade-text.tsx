"use client";
import { m } from "framer-motion";
import { useI18n, useLocaleChanged } from "@/components/i18n-provider";

// Teks kecil (menu navbar, tombol) yang memudar masuk saat bahasa berganti.
export function FadeText({ children, className }: { children: React.ReactNode; className?: string }) {
  const { locale, switching } = useI18n();
  const changed = useLocaleChanged();
  return (
    <m.span
      key={locale}
      className={className}
      initial={changed ? { opacity: 0, y: 4 } : false}
      animate={{ opacity: switching ? 0.2 : 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </m.span>
  );
}
