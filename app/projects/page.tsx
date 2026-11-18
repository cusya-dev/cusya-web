import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BackLink } from "@/components/document-page";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { email, projects, type ProjectStatus } from "@/lib/data";
import { dict, tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

export async function generateMetadata(): Promise<Metadata> {
  const p = dict[await getLocale()].projects;
  return { title: `${p.title} — Cusya`, description: p.intro };
}

const badge: Record<ProjectStatus, string> = {
  live: "bg-emerald-50 text-emerald-700",
  development: "bg-amber-50 text-amber-700",
  completed: "bg-sky-50 text-sky-700",
};

export default async function ProjectsPage() {
  const locale = await getLocale();
  const t = dict[locale];
  const p = t.projects;

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-16">
        <BackLink label={t.pages.back} />
        <p className="mt-6 text-sm font-bold tracking-[0.2em] text-cusya-600">{p.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{p.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{p.intro}</p>

        {projects.length === 0 ? (
          <p className="mt-10 text-muted-foreground">{p.empty}</p>
        ) : (
          <ul
            className={`mt-8 grid gap-4 sm:mt-10 sm:gap-5 ${
              projects.length === 1 ? "max-w-2xl" : projects.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {projects.map(({ slug, icon: Icon, image, tone, title, category, description, tags, status, href, overview }, i) => (
              <li key={title.en}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Card className="relative flex h-full flex-col overflow-hidden border-cusya-100 bg-gradient-to-b from-white to-cusya-50/80 p-5 shadow-sm shadow-cusya-600/5 sm:p-6">
                    <div aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
                    <div className="flex items-start justify-between gap-3">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt=""
                          width={56}
                          height={56}
                          className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-lg shadow-cusya-600/25 ring-4 ring-white [image-rendering:pixelated]"
                        />
                      ) : (
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg shadow-cusya-600/25`}>
                          <Icon className="h-6 w-6" />
                        </div>
                      )}
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${badge[status]}`}>{p.status[status]}</span>
                    </div>
                    <p className="mt-4 text-xs font-bold tracking-widest text-cusya-500">{tr(category, locale).toUpperCase()}</p>
                    <h2 className="mt-1 text-lg font-extrabold text-cusya-800">
                      {overview ? (
                        // after:inset-0 membuat seluruh kartu bisa dipencet
                        <Link href={`/projects/${slug}`} className="after:absolute after:inset-0 after:content-['']">
                          {tr(title, locale)}
                        </Link>
                      ) : (
                        tr(title, locale)
                      )}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{tr(description, locale)}</p>
                    {tags && tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <li key={tag} className="rounded-full border bg-cusya-50 px-2.5 py-1 text-xs font-semibold text-cusya-700">{tag}</li>
                        ))}
                      </ul>
                    )}
                    {overview && (
                      <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cusya-600">
                        {p.detail} <ArrowUpRight className="h-4 w-4" />
                      </p>
                    )}
                    {href && (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="relative z-10 mt-2 inline-flex items-center gap-1 text-sm font-bold text-cusya-600 hover:text-cusya-700">
                        {p.view} <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-sm">
          <a href={`mailto:${email}`} className="font-semibold text-cusya-600 hover:text-cusya-700">{p.cta}</a>
        </p>
      </section>
    </PageShell>
  );
}
