"use client";
import { m } from "framer-motion";
import { useI18n, useLocaleChanged } from "@/components/i18n-provider";

// Saat bahasa diganti: konten meredup sebentar, lalu muncul lagi dengan teks baru.
// key={locale} membuat konten dipasang ulang, jadi animasi masuk (hero, kartu) ikut berjalan lagi.
export function LocaleTransition({ children }: { children: React.ReactNode }) {
  const { locale, switching } = useI18n();
  const changed = useLocaleChanged();
  return (
    <m.div
      key={locale}
      initial={changed ? { opacity: 0.15, y: 12 } : false}
      animate={{ opacity: switching ? 0.15 : 1, y: switching ? 6 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
