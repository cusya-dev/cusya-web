import type { Metadata } from "next";
import { tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";
import { pages, type PageSlug } from "@/lib/pages";

export async function pageMetadata(slug: PageSlug): Promise<Metadata> {
  const locale = await getLocale();
  const page = pages[slug];
  return { title: `${tr(page.title, locale)} — Cusya`, description: tr(page.intro, locale) };
}
