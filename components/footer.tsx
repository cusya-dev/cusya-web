import Link from "next/link";
import { NavLink } from "@/components/nav-link";
import { socialIcons } from "@/components/brand-icons";
import { Logo } from "@/components/logo";
import { navLinks, socials } from "@/lib/data";
import { dict, tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

export async function Footer() {
  const locale = await getLocale();
  const t = dict[locale].footer;
  return (
    <footer className="border-t bg-cusya-50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-10 sm:py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10">
        <div className="col-span-2 md:col-span-1">
          <Logo className="h-9 w-9" />
          <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">{t.tagline}</p>
          <div className="mt-5 flex gap-4">
            {socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="text-cusya-700 hover:text-cusya-500">
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
        <nav aria-label={t.pages}>
          <h3 className="text-lg font-extrabold">{t.pages}</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.href}><NavLink href={l.href} className="hover:text-foreground">{tr(l.label, locale)}</NavLink></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.links}>
          <h3 className="text-lg font-extrabold">{t.links}</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {socials.map((s) => (
              <li key={s.id}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">{s.name}</a></li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.resources} className="col-span-2 md:col-span-1">
          <h3 className="text-lg font-extrabold">{t.resources}</h3>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li><Link href="/docs" className="hover:text-foreground">{t.docs}</Link></li>
            <li><Link href="/status" className="hover:text-foreground">{t.status}</Link></li>
            <li><Link href="/privacy" className="hover:text-foreground">{t.privacy}</Link></li>
            <li><Link href="/terms" className="hover:text-foreground">{t.terms}</Link></li>
          </ul>
        </nav>
      </div>
      <p className="border-t py-5 text-center text-sm text-muted-foreground">{t.rights}</p>
    </footer>
  );
}
