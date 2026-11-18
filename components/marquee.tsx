import { Sparkle } from "lucide-react";
import { marquee } from "@/lib/data";
import { tr } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";

// Pola latar strip (ubin 800×48, diulang & digeser pelan): gelombang halus + jaringan (network)
// + simbol kode, semuanya transparan dengan opacity rendah supaya tidak mengganggu teks.
const tile = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="48" viewBox="0 0 800 48" fill="none">
<g transform="scale(1 0.6)" stroke-width="1.2"><path stroke="rgba(255,255,255,0.10)" d="M0 40C100 10 300 70 400 40S700 10 800 40"/><path stroke="rgba(125,211,252,0.16)" d="M0 52C100 22 300 82 400 52S700 22 800 52"/></g>
<g transform="scale(1 0.6)" stroke="rgba(255,255,255,0.09)" stroke-width="1"><path d="M0 24L40 20L150 55L260 25L380 60L500 22L620 58L760 28L800 24"/><path d="M150 55L200 12M380 60L430 70M620 58L690 14"/></g>
<g fill="rgba(255,255,255,0.22)"><circle cx="40" cy="12" r="1.8"/><circle cx="150" cy="33" r="2"/><circle cx="260" cy="15" r="1.8"/><circle cx="380" cy="36" r="2"/><circle cx="500" cy="13" r="1.8"/><circle cx="620" cy="35" r="2"/><circle cx="760" cy="17" r="1.8"/><circle cx="200" cy="7" r="1.5"/><circle cx="430" cy="42" r="1.5"/><circle cx="690" cy="8" r="1.5"/></g>
<g fill="rgba(255,255,255,0.10)" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" font-weight="600"><text x="70" y="28">&lt;/&gt;</text><text x="330" y="19">{ }</text><text x="560" y="29">=&gt;</text><text x="710" y="40">( )</text></g>
</svg>`;
const meshImage = `url("data:image/svg+xml,${encodeURIComponent(tile)}")`;

export async function Marquee() {
  const locale = await getLocale();
  const row = [...marquee, ...marquee, ...marquee, ...marquee]; // 4 salinan: separuhnya tetap lebih lebar dari layar
  return (
    <div aria-hidden className="relative h-12 overflow-hidden bg-[linear-gradient(100deg,#062a6b_0%,#0a3f9a_55%,#0b57c7_100%)] text-white">
      {/* mesh gradient: dua cahaya lembut yang bergeser pelan */}
      <div className="absolute -left-16 -top-12 h-36 w-80 animate-mesh-drift bg-[radial-gradient(closest-side,rgba(56,189,248,0.35),transparent)] will-change-transform" />
      <div className="absolute -right-12 -top-12 h-36 w-80 animate-mesh-drift bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent)] will-change-transform [animation-delay:-6s]" />
      {/* gelombang + jaringan + simbol kode */}
      <div
        className="absolute inset-y-0 left-0 w-[calc(100%+800px)] animate-mesh-slide will-change-transform"
        style={{ backgroundImage: meshImage, backgroundSize: "800px 48px", backgroundRepeat: "repeat-x" }}
      />
      <div className="relative flex h-full items-center">
        <div className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]">
          {row.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 sm:gap-10 sm:pr-10">
              <span className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold sm:text-base">
                <Icon className="h-5 w-5 text-white/80" />
                {tr(label, locale)}
              </span>
              <Sparkle className="h-3.5 w-3.5 text-white/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
