"use client";
import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { socialIcons } from "@/components/brand-icons";
import { useI18n } from "@/components/i18n-provider";
import { Mascot } from "@/components/mascot";
import { HoverLift, Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { email, socials } from "@/lib/data";
import { tr } from "@/lib/locale";
import { networkPattern } from "@/lib/pattern";

const panelPattern = networkPattern("rgba(255,255,255,0.12)");

export function Contact() {
  const { locale, t } = useI18n();
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard diblokir browser */
    }
  }

  return (
    <section id="kontak" className="relative overflow-hidden bg-gradient-to-b from-white to-cusya-50/70">
      {/* pola titik halus yang memudar di atas & bawah (CSS saja) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(58,108,196,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-6 pt-14 sm:pb-10 sm:pt-20">
        <div className="grid items-stretch gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          {/* panel biru: maskot + sapaan + email */}
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-cusya-700 via-cusya-600 to-cusya-800 p-6 text-center text-white shadow-xl shadow-cusya-700/25 sm:p-8 lg:text-left">
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: panelPattern, backgroundSize: "280px 280px" }} />
              <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.4),transparent_70%)]" />
              <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)]" />

              <div className="relative">
                <Mascot pose="point" className="mx-auto w-24 drop-shadow-[0_14px_18px_rgba(0,0,0,0.3)] sm:w-28 lg:mx-0" />
                <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t.contact.heading}</h2>
                <p className="mx-auto mt-3 max-w-md text-base text-cusya-100 sm:text-lg lg:mx-0">{t.contact.text}</p>

                <div className="mt-5 rounded-2xl bg-white/10 p-4 text-left ring-1 ring-white/20">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-cusya-200">{t.contact.emailLabel}</p>
                  <p className="mt-1.5 break-all font-mono text-base font-bold sm:text-lg">{email}</p>
                  <Button variant="light" className="mt-3 w-full" onClick={copy} aria-live="polite">
                    <AnimatePresence mode="wait" initial={false}>
                      <m.span
                        key={copied ? "ok" : "copy"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex"
                      >
                        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      </m.span>
                    </AnimatePresence>
                    {copied ? t.contact.copied : t.contact.copy}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* kartu sosial media (kompak: ikon + nama sejajar, tombol di bawah) */}
          <div className="grid grid-cols-2 content-start gap-3 sm:gap-4">
            {socials.map((s, i) => {
              const Icon = socialIcons[s.id];
              return (
                <Reveal key={s.id} delay={i * 0.06}>
                  <HoverLift className="h-full">
                    <Card className="relative h-full overflow-hidden border-cusya-100 bg-gradient-to-b from-white to-cusya-50/80 p-3.5 shadow-sm shadow-cusya-600/5 transition-colors hover:border-cusya-300 sm:p-4">
                      <div aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.tone}`} />
                      <div className="flex items-center gap-3 pt-1">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.tone} text-white shadow-md ring-2 ring-white sm:h-11 sm:w-11`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-extrabold sm:text-base">{s.name}</h3>
                          <p className="line-clamp-2 break-words text-xs font-medium leading-snug text-cusya-500">{tr(s.handle, locale)}</p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                        <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.contact.visit} ${s.name}`}>
                          {t.contact.visit}
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </Card>
                  </HoverLift>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
