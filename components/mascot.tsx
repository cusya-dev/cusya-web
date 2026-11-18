"use client";
import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";

// Pose maskot: wave (hero), point (kontak), confused (404), head (cadangan, belum dipakai). Logo ada di components/logo.tsx.
// `unoptimized` supaya gambar disajikan apa adanya tanpa image optimizer.
const poses = {
  head: { src: "/mascot-head.webp", w: 640, h: 557 },
  wave: { src: "/mascot.webp", w: 960, h: 915 },
  point: { src: "/mascot-point.webp", w: 640, h: 712 },
  confused: { src: "/mascot-confused.webp", w: 720, h: 858 },
} as const;

export type MascotPose = keyof typeof poses;

export function Mascot({ pose = "wave", className, eager = false }: { pose?: MascotPose; className?: string; eager?: boolean }) {
  const priority = eager ? ({ loading: "eager", fetchPriority: "high" } as const) : {};
  const { t } = useI18n();
  const p = poses[pose];
  return <Image src={p.src} alt={t.mascot.alt} width={p.w} height={p.h} unoptimized className={cn("h-auto", className)} {...priority} />;
}
