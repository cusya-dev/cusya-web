import { AppWindow, Bot, Cloud, Flame, KeyRound, LayoutTemplate, Wrench, type LucideIcon } from "lucide-react";
import type { L } from "@/lib/locale";

// Semua teks yang tampil di UI berbentuk { id: "...", en: "..." }.
const same = (s: string): L => ({ id: s, en: s });

export const navLinks: { label: L; href: string; badge?: string }[] = [
  { label: same("Home"), href: "/#home" },
  { label: { id: "Layanan", en: "Services" }, href: "/#layanan" },
  { label: { id: "Proyek", en: "Projects" }, href: "/projects" },
  { label: { id: "Tim", en: "Team" }, href: "/#tim" },
  { label: { id: "Kontak", en: "Contact" }, href: "/#kontak", badge: "NEW!" },
];

// Angka statistik masih contoh, ganti dengan data asli toko.
export const stats: { to?: number; suffix?: L; text?: L; label: L; accent?: boolean }[] = [
  { to: 500, suffix: same("+"), label: { id: "Produk Digital", en: "Digital Products" } },
  { text: { id: "Sejak 2026", en: "Since 2026" }, label: { id: "Berdiri", en: "Established" }, accent: true },
  { to: 5, suffix: { id: "rb+", en: "k+" }, label: { id: "Pelanggan", en: "Customers" } },
];

// Strip berjalan di bawah hero (ikon + teks dua bahasa).
export const marquee: { icon: LucideIcon; label: L }[] = [
  { icon: Bot, label: { id: "Bot & Script", en: "Bots & Scripts" } },
  { icon: Cloud, label: same("Cloud Hosting") },
  { icon: AppWindow, label: { id: "Template Website", en: "Website Templates" } },
  { icon: Wrench, label: same("Custom Development") },
];

export const services = [
  { icon: LayoutTemplate, tone: "from-sky-400 to-sky-600",
    title: { id: "Template & Website", en: "Templates & Websites" },
    text: { id: "Template website, landing page, dan UI kit siap pakai. Tinggal ganti isi, langsung online.", en: "Ready-to-use website templates, landing pages, and UI kits. Swap the content and go live." } },
  { icon: KeyRound, tone: "from-indigo-400 to-indigo-600",
    title: { id: "Software & Lisensi", en: "Software & Licenses" },
    text: { id: "Lisensi aplikasi dan tools kerja, lengkap dengan panduan aktivasi.", en: "Licenses for apps and work tools, with activation guides included." } },
  { icon: Bot, tone: "from-cusya-400 to-cusya-600",
    title: { id: "Bot & Script", en: "Bots & Scripts" },
    text: { id: "Bot Discord, script, dan automasi siap pakai beserta dokumentasinya.", en: "Ready-made Discord bots, scripts, and automation with documentation." } },
  { icon: Cloud, tone: "from-cyan-400 to-cyan-600",
    title: same("Cloud Hosting"),
    text: { id: "Hosting cloud untuk website dan aplikasi: cepat, stabil, dengan paket yang bisa naik sesuai kebutuhan.", en: "Cloud hosting for websites and apps: fast, stable, with plans that scale as you grow." } },
];

// ============================================================
// PROYEK — tampil di halaman /projects. Tambah/hapus proyek cukup dengan menambah/menghapus satu blok { ... }.
// Wajib: title, category, description (dua bahasa). Opsional: tags, status, href (tombol "Lihat Proyek").
// status: "live" | "development" | "completed". Tambahkan proyek berikutnya di bawah Will Forge.
// ============================================================
export type ProjectStatus = "live" | "development" | "completed";
export type Project = {
  slug: string; // dipakai untuk alamat halaman detail: /projects/<slug>
  icon: LucideIcon;
  image?: string; // opsional: file di /public/projects/. Kalau diisi, dipakai menggantikan ikon.
  tone: string;
  title: L;
  category: L;
  description: L;
  tags?: string[];
  status: ProjectStatus;
  href?: string;
  // Isi halaman detail (opsional). Kalau kosong, kartu tidak punya halaman detail.
  overview?: L;
  info?: { label: L; value: L }[]; // baris tabel "Info" di halaman detail
};

export const projects: Project[] = [
  {
    slug: "will-forge",
    icon: Flame, image: "/projects/willforge.webp", tone: "from-lime-400 to-green-600", status: "completed",
    title: same("Will Forge"),
    category: { id: "Aplikasi Android", en: "Android App" },
    description: {
      id: "Aplikasi disiplin diri: hitung hari streak-mu, naik pangkat dari Recruit sampai General of the Army, dan rawat serigala peliharaan yang berevolusi dari telur menjadi Fenrir. Dilengkapi 8 tema dan widget layar utama.",
      en: "A self-discipline app: track your streak days, climb ranks from Recruit to General of the Army, and raise a wolf companion that evolves from an egg into Fenrir. Includes 8 themes and a home screen widget.",
    },
    tags: ["Android", "Kotlin", "Jetpack Compose"],
    overview: {
      id: "Will Forge membantu kamu membangun disiplin lewat satu angka sederhana: berapa hari kamu bertahan. Setiap hari yang kamu lewati menambah streak, memberi EXP untuk peliharaanmu, dan membuka pangkat baru. Kalau streak putus, kamu reset dan peliharaanmu ikut kehilangan sebagian EXP, jadi konsistensi benar-benar terasa.",
      en: "Will Forge helps you build discipline around one simple number: how many days you've held on. Every day you get through adds to your streak, earns EXP for your companion, and unlocks a new rank. If the streak breaks, you reset and your companion loses part of its EXP, so consistency really counts.",
    },
    info: [
      { label: same("Platform"), value: { id: "Android 8.0 (API 26) ke atas", en: "Android 8.0 (API 26) and up" } },
      { label: { id: "Teknologi", en: "Built with" }, value: same("Kotlin + Jetpack Compose + Material 3") },
      { label: { id: "Arsitektur", en: "Architecture" }, value: same("MVVM") },
      { label: { id: "Versi", en: "Version" }, value: same("1.0") },
    ],
  },
];

// ============================================================
// TIM — tambah/hapus anggota cukup dengan menambah/menghapus satu blok { ... } di bawah.
// UI otomatis menyesuaikan jumlah kartu (selalu rata tengah).
// Wajib: name, role, bio (role & bio dua bahasa). Opsional: photo (file di /public/team/), linkedin, portfolio.
// Tombol Profil/Portofolio hanya muncul kalau linknya diisi.
// ============================================================
export type TeamMember = {
  name: string;
  role: L;
  bio: L;
  photo?: string; // contoh: "/team/budi.webp"
  linkedin?: string;
  portfolio?: string;
  // Tombol "Contact" ke anggota ini (teks dan ikon sama untuk semua). href bisa link apa saja:
  //   WhatsApp  → https://wa.me/6281234567890   (kode negara, tanpa + dan tanpa 0 di depan)
  //   Discord   → https://discord.com/users/ID_PENGGUNA   (ID angka akun Discord)
  //   Instagram → https://instagram.com/username
  //   Telegram  → https://t.me/username
  //   Email     → mailto:nama@email.com
  // Teks tombol diatur di lib/locale.ts (team.contact). Isi label (opsional) untuk teks khusus anggota ini.
  contact?: { href: string; label?: L };
};

export const team: TeamMember[] = [
  {
    name: "Rav",
    photo: "/team/rav.webp",
    contact: { href: "https://discord.gg/eeHhnCDt" },
    role: same("Founder"),
    bio: {
      id: "Pendiri Cusya. Memilih dan memastikan setiap produk digital di toko ini layak dibeli.",
      en: "Founder of Cusya. Curates and makes sure every digital product in the store is worth buying.",
    },
  },
];

// Warna cover kartu tim dipilih otomatis berurutan.
export const teamCovers = ["from-sky-200 to-cusya-300", "from-cusya-200 to-indigo-300", "from-cyan-200 to-cusya-300", "from-cusya-100 to-sky-300"];

// ============================================================
// SOSIAL MEDIA — ganti href dan handle dengan akun asli Cusya.
// id: discord | tiktok | instagram | linkedin | x | github
// ============================================================
export type SocialId = "discord" | "tiktok" | "instagram" | "linkedin" | "x" | "github";

export const socials: { id: SocialId; name: string; handle: L; href: string; tone: string }[] = [
  { id: "discord", name: "Discord", handle: { id: "Gabung server Cusya", en: "Join the Cusya server" }, href: "https://discord.gg/VpXjtJRexS", tone: "from-indigo-400 to-indigo-600" },
  { id: "tiktok", name: "TikTok", handle: same("@cusya.id"), href: "https://tiktok.com/@cusya.id", tone: "from-cusya-700 to-cusya-900" },
  { id: "instagram", name: "Instagram", handle: same("@cusya.id"), href: "https://www.instagram.com/cusya.id", tone: "from-sky-400 to-indigo-500" },
  { id: "linkedin", name: "LinkedIn", handle: same("cusya"), href: "https://linkedin.com", tone: "from-cusya-400 to-cusya-600" },
  { id: "x", name: "X / Twitter", handle: same("@Cusya_id"), href: "https://x.com/Cusya_id", tone: "from-cusya-600 to-cusya-800" },
  { id: "github", name: "GitHub", handle: same("cusya-dev"), href: "https://github.com/cusya-dev", tone: "from-cyan-400 to-cusya-600" },
];

export const email = "cusyaid@gmail.com";
