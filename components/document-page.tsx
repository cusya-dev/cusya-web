import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { formatDate } from "@/lib/format";
import { dict, tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";
import { pages, pagesUpdated, type PageSlug } from "@/lib/pages";

export function BackLink({ label }: { label: string }) {
  return (
    <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cusya-600 hover:text-cusya-700">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}

export async function DocumentPage({ slug }: { slug: PageSlug }) {
  const locale = await getLocale();
  const t = dict[locale].pages;
  const page = pages[slug];
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <BackLink label={t.back} />
        <p className="mt-6 text-sm font-bold tracking-[0.2em] text-cusya-600">{tr(page.eyebrow, locale)}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{tr(page.title, locale)}</h1>
        <p className="mt-2 text-sm text-cusya-500">{t.updated}: {formatDate(pagesUpdated, locale)}</p>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{tr(page.intro, locale)}</p>

        {page.toc && (
          <nav aria-label={t.onThisPage} className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {page.sections.map((s, i) => (
                <li key={i}>
                  <a href={`#s${i + 1}`} className="inline-block rounded-full border bg-cusya-50 px-3 py-1.5 text-sm font-semibold text-cusya-700 transition-colors hover:bg-cusya-100">
                    {tr(s.h, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {page.sections.map((s, i) => (
          <section key={i} id={`s${i + 1}`} className="mt-9 sm:mt-10">
            <h2 className="text-xl font-extrabold">{tr(s.h, locale)}</h2>
            {s.ol && (
              <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-muted-foreground marker:font-bold marker:text-cusya-600">
                {s.ol.map((x, j) => <li key={j}>{tr(x, locale)}</li>)}
              </ol>
            )}
            {s.ul && (
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground marker:text-cusya-500">
                {s.ul.map((x, j) => <li key={j}>{tr(x, locale)}</li>)}
              </ul>
            )}
            {s.p?.map((x, j) => (
              <p key={j} className="mt-3 leading-relaxed text-muted-foreground">{tr(x, locale)}</p>
            ))}
          </section>
        ))}
      </article>
    </PageShell>
  );
}
