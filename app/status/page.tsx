import type { Metadata } from "next";
import { BackLink } from "@/components/document-page";
import { PageShell } from "@/components/page-shell";
import { Card } from "@/components/ui/card";
import { email } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { dict, tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";
import { incidents, statusComponents, statusUpdated, type StatusLevel } from "@/lib/status";

export async function generateMetadata(): Promise<Metadata> {
  const s = dict[await getLocale()].status;
  return { title: `${s.title} — Cusya`, description: s.intro };
}

const dot: Record<StatusLevel, string> = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  outage: "bg-rose-500",
  maintenance: "bg-sky-500",
};
const badge: Record<StatusLevel, string> = {
  operational: "bg-emerald-50 text-emerald-700",
  degraded: "bg-amber-50 text-amber-700",
  outage: "bg-rose-50 text-rose-700",
  maintenance: "bg-sky-50 text-sky-700",
};

export default async function StatusPage() {
  const locale = await getLocale();
  const t = dict[locale];
  const s = t.status;
  const allOk = statusComponents.every((c) => c.level === "operational");

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <BackLink label={t.pages.back} />
        <p className="mt-6 text-sm font-bold tracking-[0.2em] text-cusya-600">{s.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{s.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground">{s.intro}</p>

        <Card className={`mt-6 flex items-center gap-3 p-5 ${allOk ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`} role="status">
          <span className={`h-3 w-3 shrink-0 rounded-full ${allOk ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden />
          <p className="font-extrabold">{allOk ? s.allOk : s.someIssues}</p>
        </Card>
        <p className="mt-2 text-sm text-cusya-500">{s.updated}: {formatDate(statusUpdated, locale)}</p>

        <Card className="mt-5 divide-y overflow-hidden">
          {statusComponents.map((c) => (
            <div key={c.name.en} className="flex items-center justify-between gap-3 px-5 py-4">
              <p className="font-semibold">{tr(c.name, locale)}</p>
              <span className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${badge[c.level]}`}>
                <span className={`h-2 w-2 rounded-full ${dot[c.level]}`} aria-hidden />
                {s.levels[c.level]}
              </span>
            </div>
          ))}
        </Card>

        <section className="mt-10">
          <h2 className="text-xl font-extrabold">{s.incidents}</h2>
          {incidents.length === 0 ? (
            <p className="mt-3 text-muted-foreground">{s.noIncidents}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {incidents.map((i) => (
                <li key={i.date + i.title.en}>
                  <Card className="p-5">
                    <p className="text-sm text-cusya-500">{formatDate(i.date, locale)} · {i.resolved ? s.resolved : s.ongoing}</p>
                    <p className="mt-1 font-extrabold">{tr(i.title, locale)}</p>
                    <p className="mt-1 text-muted-foreground">{tr(i.body, locale)}</p>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-10 text-sm text-muted-foreground">
          {s.note} <a href={`mailto:${email}`} className="font-semibold text-cusya-600 hover:text-cusya-700">{s.report}</a>
        </p>
      </article>
    </PageShell>
  );
}
