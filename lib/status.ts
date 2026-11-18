import type { L } from "@/lib/locale";

// ============================================================
// STATUS LAYANAN — edit manual di sini lalu deploy ulang.
// level: "operational" | "degraded" | "outage" | "maintenance"
// ============================================================
export type StatusLevel = "operational" | "degraded" | "outage" | "maintenance";

export const statusUpdated = "2026-10-26"; // YYYY-MM-DD

export const statusComponents: { name: L; level: StatusLevel }[] = [
  { name: { id: "Website", en: "Website" }, level: "operational" },
  { name: { id: "Template & Software", en: "Templates & Software" }, level: "operational" },
  { name: { id: "Bot & Script", en: "Bots & Scripts" }, level: "operational" },
  { name: { id: "Cloud Hosting", en: "Cloud Hosting" }, level: "operational" },
  { name: { id: "Dukungan (Discord & Email)", en: "Support (Discord & Email)" }, level: "operational" },
];

// Tambahkan insiden terbaru di paling atas. Kosongkan array kalau tidak ada.
export const incidents: { date: string; title: L; body: L; resolved: boolean }[] = [
  // {
  //   date: "2026-10-20",
  //   title: { id: "Hosting sempat lambat", en: "Hosting was briefly slow" },
  //   body: { id: "Sudah diperbaiki.", en: "This has been fixed." },
  //   resolved: true,
  // },
];
