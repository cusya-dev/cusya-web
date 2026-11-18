import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/data";
import { dict, tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

export async function Services() {
  const locale = await getLocale();
  const t = dict[locale].services;
  return (
    <section id="layanan" className="relative overflow-hidden bg-gradient-to-b from-white via-cusya-50/70 to-white">
      {/* pola titik halus, memudar di atas & bawah (CSS saja, tanpa gambar) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(58,108,196,0.14)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(147,188,245,0.35),transparent_68%)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-cusya-100 px-3 py-1 text-xs font-bold tracking-[0.2em] text-cusya-700 sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-cusya-500" aria-hidden />
            {t.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t.heading}</h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground sm:text-lg">{t.text}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {services.map(({ icon: Icon, tone, title, text }, i) => (
            <Reveal key={title.en} delay={(i % 4) * 0.08}>
              <Card className="relative h-full overflow-hidden border-cusya-100 bg-gradient-to-b from-white to-cusya-50/80 p-5 shadow-sm shadow-cusya-600/5 sm:p-6">
                {/* garis aksen warna di atas kartu */}
                <div aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone}`} />
                {/* cahaya warna di pojok */}
                <div aria-hidden className={`absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${tone} opacity-10`} />

                {/* HP: ikon di kiri, teks di kanan (hemat tinggi). Layar lebar: bertumpuk */}
                <div className="relative flex items-start gap-4 sm:block">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tone} text-white shadow-lg shadow-cusya-600/25 ring-4 ring-white sm:h-14 sm:w-14`}>
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-cusya-800 sm:mt-5 sm:text-lg">{tr(title, locale)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-2 sm:text-base">{tr(text, locale)}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
