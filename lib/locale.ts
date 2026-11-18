// Bahasa & kamus teks. Aman diimpor dari server maupun client component.
export type Locale = "id" | "en";
export const locales: Locale[] = ["id", "en"];
export const defaultLocale: Locale = "en";
export const LANG_COOKIE = "cusya-lang";

/** Teks dua bahasa: { id: "...", en: "..." } */
export type L = Record<Locale, string>;
export const tr = (l: L, locale: Locale) => l[locale];

const id = {
  meta: {
    title: "Cusya — Digital Store Indonesia",
    description: "Cusya adalah digital store: template website, software, bot, cloud hosting, dan produk digital lainnya.",
  },
  nav: {
    cta: "Hubungi Kami", menu: "MENU", openMenu: "Buka menu", closeMenu: "Tutup menu",
    main: "Utama", top: "Cusya, ke atas", language: "Bahasa",
  },
  hero: {
    welcome: "SELAMAT DATANG DI",
    homeOf: "Rumah untuk",
    rotating: ["Template Website", "Software & Lisensi", "Bot & Script", "Cloud Hosting"],
    text: "Digital store untuk template website, software, bot, dan cloud hosting. Bayar, lalu langsung pakai.",
    browse: "Lihat Produk",
    contact: "Hubungi Kami",
  },
  mascot: {
    alt: "Maskot Cusya",
    aria: "Sapa maskot Cusya",
    hint: "Klik aku!",
    link: "Lihat produk",
    chips: ["Template", "Software", "Hosting"],
    messages: [
      "Halo, aku maskot Cusya!",
      "Cari template, software, bot, atau hosting? Semua ada di sini.",
      "Produk digital langsung bisa dipakai setelah pembayaran.",
      "Bingung pilih produk? Tanya kami di Discord.",
      "Psst, klik aku lagi kalau mau disapa.",
    ],
  },
  services: {
    eyebrow: "LAYANAN",
    heading: "Digital store dengan banyak pilihan",
    text: "Semua produk berbentuk digital dan bisa langsung dipakai setelah pembayaran.",
  },
  projects: {
    eyebrow: "PROYEK",
    title: "Proyek Kami",
    intro: "Daftar proyek Cusya beserta penjelasan singkat tiap proyek.",
    view: "Lihat Proyek",
    detail: "Lihat detail",
    backToList: "Kembali ke Proyek",
    overview: "Tentang proyek",
    info: "Informasi",
    empty: "Belum ada proyek yang ditampilkan.",
    cta: "Punya ide proyek? Ceritakan ke kami",
    status: { live: "Tersedia", development: "Dalam pengembangan", completed: "Selesai" },
  },
  team: {
    eyebrow: "TIM CUSYA",
    heading: "Orang di balik Cusya",
    text: "Dikelola langsung oleh pendirinya.",
    profile: "Profil",
    portfolio: "Portofolio",
    // Teks tombol hubungi anggota tim (sama untuk semua anggota dan semua jenis link).
    contact: "Hubungi",
  },
  contact: {
    heading: "Let's go, saatnya ngobrol!",
    text: "Mau beli, tanya stok, atau request produk? Kami balas dalam 1 hari kerja.",
    emailLabel: "OFFICIAL EMAIL",
    copy: "Salin Email",
    copied: "Email tersalin",
    visit: "Kunjungi",
  },
  footer: {
    tagline: "Digital store untuk template website, software, bot, dan cloud hosting.",
    pages: "Halaman",
    resources: "Sumber Daya",
    docs: "Dokumentasi",
    status: "Status",
    privacy: "Kebijakan Privasi",
    terms: "Syarat & Ketentuan",
    links: "Link",
    rights: "© 2026 Cusya. Semua hak dilindungi.",
  },
  pages: { back: "Kembali ke Beranda", updated: "Terakhir diperbarui", onThisPage: "Di halaman ini" },
  status: {
    eyebrow: "STATUS",
    title: "Status Layanan",
    intro: "Kondisi terkini layanan Cusya.",
    allOk: "Semua sistem berjalan normal",
    someIssues: "Ada layanan yang sedang bermasalah",
    levels: { operational: "Normal", degraded: "Performa menurun", outage: "Gangguan", maintenance: "Pemeliharaan" },
    updated: "Diperbarui",
    incidents: "Riwayat insiden",
    noIncidents: "Tidak ada insiden yang dilaporkan.",
    resolved: "Selesai",
    ongoing: "Berlangsung",
    note: "Halaman ini diperbarui manual oleh tim Cusya.",
    report: "Menemukan masalah? Hubungi kami",
  },
  verify: {
    title: "Memverifikasi Koneksimu",
    text: "Verifikasi diperlukan untuk memastikan sesi yang aman sebelum mengakses Cusya.",
    error: "Verifikasi gagal. Silakan coba lagi.",
    noscript: "Aktifkan JavaScript untuk melanjutkan.",
  },
  notFound: {
    code: "ERROR 404",
    title: "Waduh, nyasar nih",
    text: "Halaman yang kamu cari tidak ada atau sudah dipindah. Yuk balik ke beranda.",
    back: "Kembali ke Beranda",
    home: "Cusya, ke beranda",
  },
};

const en: typeof id = {
  meta: {
    title: "Cusya — Digital Store Indonesia",
    description: "Cusya is a digital store: website templates, software, bots, cloud hosting, and more digital products.",
  },
  nav: {
    cta: "Contact Us", menu: "MENU", openMenu: "Open menu", closeMenu: "Close menu",
    main: "Main", top: "Cusya, back to top", language: "Language",
  },
  hero: {
    welcome: "WELCOME TO",
    homeOf: "Home of",
    rotating: ["Website Templates", "Software & Licenses", "Bots & Scripts", "Cloud Hosting"],
    text: "A digital store for website templates, software, bots, and cloud hosting. Pay, then start using right away.",
    browse: "Browse Products",
    contact: "Contact Us",
  },
  mascot: {
    alt: "Cusya mascot",
    aria: "Say hi to the Cusya mascot",
    hint: "Click me!",
    link: "Browse products",
    chips: ["Templates", "Software", "Hosting"],
    messages: [
      "Hi, I'm the Cusya mascot!",
      "Looking for templates, software, bots, or hosting? It's all here.",
      "Digital products are ready to use right after payment.",
      "Not sure what to pick? Ask us on Discord.",
      "Psst, click me again if you want another hello.",
    ],
  },
  services: {
    eyebrow: "SERVICES",
    heading: "A digital store with plenty of choices",
    text: "Every product is digital and ready to use right after payment.",
  },
  projects: {
    eyebrow: "PROJECTS",
    title: "Our Projects",
    intro: "A list of Cusya projects with a short explanation of each.",
    view: "View Project",
    detail: "View details",
    backToList: "Back to Projects",
    overview: "About the project",
    info: "Info",
    empty: "No projects to show yet.",
    cta: "Have a project idea? Tell us about it",
    status: { live: "Live", development: "In development", completed: "Completed" },
  },
  team: {
    eyebrow: "CUSYA TEAM",
    heading: "The person behind Cusya",
    text: "Run directly by its founder.",
    profile: "Profile",
    portfolio: "Portfolio",
    // Text of the contact button on team cards (same for every member and link type).
    contact: "Contact",
  },
  contact: {
    heading: "Let's go, time to chat!",
    text: "Want to buy, ask about stock, or request a product? We reply within 1 business day.",
    emailLabel: "OFFICIAL EMAIL",
    copy: "Copy Email",
    copied: "Email copied",
    visit: "Visit",
  },
  footer: {
    tagline: "A digital store for website templates, software, bots, and cloud hosting.",
    pages: "Pages",
    resources: "Resources",
    docs: "Documentation",
    status: "Status",
    privacy: "Privacy Policy",
    terms: "Terms",
    links: "Links",
    rights: "© 2026 Cusya. All rights reserved.",
  },
  pages: { back: "Back to Home", updated: "Last updated", onThisPage: "On this page" },
  status: {
    eyebrow: "STATUS",
    title: "Service Status",
    intro: "The current state of Cusya services.",
    allOk: "All systems operational",
    someIssues: "Some services are experiencing issues",
    levels: { operational: "Operational", degraded: "Degraded performance", outage: "Outage", maintenance: "Maintenance" },
    updated: "Updated",
    incidents: "Incident history",
    noIncidents: "No incidents reported.",
    resolved: "Resolved",
    ongoing: "Ongoing",
    note: "This page is updated manually by the Cusya team.",
    report: "Seeing a problem? Contact us",
  },
  verify: {
    title: "Verifying Your Connection",
    text: "Verification required to ensure a secure session before accessing Cusya.",
    error: "Verification failed. Please try again.",
    noscript: "Please enable JavaScript to continue.",
  },
  notFound: {
    code: "ERROR 404",
    title: "Oops, you're lost",
    text: "The page you're looking for doesn't exist or has moved. Let's head back home.",
    back: "Back to Home",
    home: "Cusya, go home",
  },
};

export const dict: Record<Locale, typeof id> = { id, en };
