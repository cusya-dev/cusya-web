"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = React.ComponentProps<typeof Link> & { closeMenu?: () => void };

// Scroll halus digerakkan JS (bukan scroll-behavior bawaan browser) supaya tidak terganggu
// penguncian scroll dialog, pengembalian fokus, atau perubahan tinggi bar alamat di Android.
// Posisi tujuan dihitung ulang tiap frame, jadi tetap tepat walau layout bergeser.
let raf = 0;
function scrollToElement(el: HTMLElement) {
  cancelAnimationFrame(raf);
  const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const targetY = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  const jump = (y: number) => window.scrollTo({ top: y, behavior: "instant" });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    jump(targetY());
    return;
  }

  const startY = window.scrollY;
  const duration = Math.min(900, 350 + Math.abs(targetY() - startY) * 0.25);
  const t0 = performance.now();

  // Pengguna menyentuh/menggulir layar → hentikan animasi.
  const stop = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
  };
  window.addEventListener("wheel", stop, { passive: true, once: true });
  window.addEventListener("touchstart", stop, { passive: true, once: true });

  const tick = (now: number) => {
    const p = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    jump(startY + (targetY() - startY) * eased);
    if (p < 1) raf = requestAnimationFrame(tick);
    else stop();
  };
  raf = requestAnimationFrame(tick);
}

// - Di beranda: scroll sendiri ke bagian tujuan (alamat URL sengaja tidak diubah).
// - Di halaman lain: pindah ke beranda lewat router Next, lalu Next menggulir ke bagian tujuan.
export function NavLink({ href, closeMenu, onClick, children, ...rest }: Props) {
  const pathname = usePathname();
  const target = typeof href === "string" ? href : "";
  const hash = target.includes("#") ? target.split("#")[1] : "";

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    closeMenu?.();
    if (!hash || pathname !== "/") return;
    const el = document.getElementById(hash);
    if (!el) return;
    e.preventDefault();
    scrollToElement(el);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
