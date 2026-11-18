"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { defaultLocale, dict, type Locale } from "@/lib/locale";

type Ctx = {
  locale: Locale;
  t: (typeof dict)["id"];
  /** true selama bahasa sedang diganti (dipakai untuk meredupkan konten sebentar) */
  switching: boolean;
  setSwitching: (v: boolean) => void;
};
const I18nContext = createContext<Ctx>({ locale: defaultLocale, t: dict[defaultLocale], switching: false, setSwitching: () => {} });

export function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [switching, setSwitching] = useState(false);
  const value = useMemo(() => ({ locale, t: dict[locale], switching, setSwitching }), [locale, switching]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

/** true pada render ketika bahasa baru saja berganti (bukan saat halaman pertama dimuat). */
export function useLocaleChanged() {
  const { locale } = useI18n();
  const prev = useRef(locale);
  const changed = prev.current !== locale;
  useEffect(() => {
    prev.current = locale;
  }, [locale]);
  return changed;
}
