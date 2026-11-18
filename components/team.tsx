import Image from "next/image";
import { BadgeCheck, Briefcase, Linkedin, MessageCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HoverLift, Reveal } from "@/components/reveal";
import { team, teamCovers, type TeamMember } from "@/lib/data";
import { dict, tr, type Locale } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";
import { networkPattern } from "@/lib/pattern";

const bandPattern = networkPattern("rgba(255,255,255,0.14)");
const coverPattern = networkPattern("rgba(255,255,255,0.6)");

function ContactButton({ contact, template, locale }: { contact: NonNullable<TeamMember["contact"]>; template: string; locale: Locale }) {
  const label = contact.label ? tr(contact.label, locale) : template;
  const external = !contact.href.startsWith("mailto:");
  return (
    <Button asChild size="sm" className="mt-5 h-auto min-h-10 w-full whitespace-normal py-2 text-center">
      <a href={contact.href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <MessageCircle className="h-4 w-4 shrink-0" />
        {label}
      </a>
    </Button>
  );
}

// Lebar kartu menyesuaikan jumlah anggota (1 anggota = kartu lebih lebar, bukan 25% layar).
const cardWidth =
  team.length === 1
    ? "w-full max-w-md"
    : team.length === 2
      ? "w-full max-w-sm"
      : "w-full max-w-sm sm:max-w-none sm:w-[calc(50%_-_0.625rem)] lg:w-[calc(25%_-_0.9375rem)]";

function Wave({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 24" preserveAspectRatio="none" className={`absolute inset-x-0 h-5 w-full text-white sm:h-6 ${className ?? ""}`}>
      <path d="M0 0H1440V8C1200 28 960 4 720 12S240 24 0 6Z" fill="currentColor" />
    </svg>
  );
}

export async function Team() {
  const locale = await getLocale();
  const t = dict[locale].team;
  return (
    <section id="tim" className="relative overflow-hidden bg-gradient-to-br from-cusya-700 via-cusya-600 to-cusya-800 py-16 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.18),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(125,211,252,0.25),transparent_40%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: bandPattern, backgroundSize: "280px 280px" }} />
      {/* tepi bergelombang agar section tidak terlihat kotak */}
      <Wave className="top-0" />
      <Wave className="bottom-0 rotate-180" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-[0.2em] text-cusya-100 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden />
            {t.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t.heading}</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-cusya-100 sm:text-lg">{t.text}</p>
        </Reveal>

        {/* flex-wrap + justify-center: berapa pun jumlah anggota, kartu tetap rata tengah */}
        <div className="mt-8 flex flex-wrap justify-center gap-5 sm:mt-12">
          {team.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.08} className={cardWidth}>
              <HoverLift className="h-full">
                <Card className="h-full overflow-hidden border-white/40 shadow-2xl shadow-cusya-900/30">
                  <div className={`relative h-24 bg-gradient-to-br sm:h-28 ${teamCovers[i % teamCovers.length]}`}>
                    <div aria-hidden className="absolute inset-0" style={{ backgroundImage: coverPattern, backgroundSize: "280px 280px" }} />
                    <div aria-hidden className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-white/30" />
                  </div>

                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <div className="relative z-10 -mt-11 inline-block rounded-full bg-gradient-to-br from-cusya-400 to-sky-400 p-1 shadow-lg shadow-cusya-700/30 sm:-mt-[52px]">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-gradient-to-br from-cusya-400 to-cusya-700 text-2xl font-extrabold text-white sm:h-24 sm:w-24">
                        {p.photo ? (
                          <Image src={p.photo} alt={p.name} width={96} height={96} unoptimized className="h-full w-full object-cover" />
                        ) : (
                          p.name.trim()[0]
                        )}
                      </div>
                    </div>

                    <h3 className="mt-3 text-xl font-extrabold text-cusya-900">{p.name}</h3>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-cusya-100 px-2.5 py-1 text-xs font-bold text-cusya-700">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                      {tr(p.role, locale)}
                    </p>

                    <div className="relative mt-4 rounded-2xl bg-cusya-50 p-4">
                      <Quote className="absolute right-3 top-3 h-6 w-6 text-cusya-200" aria-hidden />
                      <p className="pr-8 text-sm leading-relaxed text-muted-foreground">{tr(p.bio, locale)}</p>
                    </div>

                    {p.contact && <ContactButton contact={p.contact} template={t.contact} locale={locale} />}
                    {(p.linkedin || p.portfolio) && (
                      <div className={`${p.contact ? "mt-2" : "mt-5"} flex gap-2`}>
                        {p.linkedin && (
                          <Button asChild variant="soft" size="sm" className="flex-1">
                            <a href={p.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" />{t.profile}</a>
                          </Button>
                        )}
                        {p.portfolio && (
                          <Button asChild variant="soft" size="sm" className="flex-1">
                            <a href={p.portfolio} target="_blank" rel="noopener noreferrer"><Briefcase className="h-4 w-4" />{t.portfolio}</a>
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </HoverLift>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
