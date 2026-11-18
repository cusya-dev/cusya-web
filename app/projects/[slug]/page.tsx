import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { projects, type ProjectStatus } from "@/lib/data";
import { dict, tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

type Params = { params: Promise<{ slug: string }> };

const badge: Record<ProjectStatus, string> = {
  live: "bg-emerald-50 text-emerald-700",
  development: "bg-amber-50 text-amber-700",
  completed: "bg-sky-50 text-sky-700",
};

const find = (slug: string) => projects.find((x) => x.slug === slug && x.overview);

export function generateStaticParams() {
  return projects.filter((x) => x.overview).map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = find((await params).slug);
  if (!project) return {};
  const locale = await getLocale();
  return { title: `${tr(project.title, locale)} — Cusya`, description: tr(project.description, locale) };
}

export default async function ProjectDetail({ params }: Params) {
  const project = find((await params).slug);
  if (!project) notFound();
  const locale = await getLocale();
  const p = dict[locale].projects;
  const { icon: Icon, image, tone, title, category, description, tags, status, href, overview, info } = project;

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-cusya-600 hover:text-cusya-700">
          <ArrowLeft className="h-4 w-4" />
          {p.backToList}
        </Link>

        <div className="mt-6 flex items-center gap-4">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover shadow-lg shadow-cusya-600/25 ring-4 ring-white [image-rendering:pixelated]" />
          ) : (
            <div className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg shadow-cusya-600/25`}>
              <Icon className="h-8 w-8" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-widest text-cusya-500">{tr(category, locale).toUpperCase()}</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">{tr(title, locale)}</h1>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${badge[status]}`}>{p.status[status]}</span>
          {tags?.map((tag) => (
            <span key={tag} className="rounded-full border bg-cusya-50 px-2.5 py-1 text-xs font-semibold text-cusya-700">{tag}</span>
          ))}
        </div>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{tr(description, locale)}</p>

        {overview && (
          <section className="mt-9">
            <h2 className="text-xl font-extrabold">{p.overview}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{tr(overview, locale)}</p>
          </section>
        )}

        {info && (
          <section className="mt-9">
            <h2 className="text-xl font-extrabold">{p.info}</h2>
            <Card className="mt-4 divide-y overflow-hidden">
              {info.map((row) => (
                <div key={row.label.en} className="flex items-start justify-between gap-4 px-5 py-3.5 text-sm sm:text-base">
                  <p className="font-semibold text-muted-foreground">{tr(row.label, locale)}</p>
                  <p className="text-right font-semibold">{tr(row.value, locale)}</p>
                </div>
              ))}
            </Card>
          </section>
        )}

        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-cusya-600 hover:text-cusya-700">
            {p.view} <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </article>
    </PageShell>
  );
}
