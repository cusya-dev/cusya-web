# Cusya Web

Next.js 15 + Tailwind CSS 3 + shadcn/ui + Framer Motion.

    npm install
    npm run dev   # http://localhost:3000

Ganti teks placeholder (nama tim, email, link sosial, statistik) di `lib/data.ts`.
Warna ada di `tailwind.config.ts` (skala `cusya`) dan `app/globals.css`.

## Bahasa (ID / EN)

- Tombol ID | EN ada di navbar. Pilihan disimpan di cookie `cusya-lang`; bahasa default English (ubah `defaultLocale` di `lib/locale.ts`).
- Teks antarmuka ada di `lib/locale.ts` (kamus `id` dan `en`; kunci harus sama di keduanya).
- Teks data (layanan, tim, sosial, strip berjalan) ada di `lib/data.ts` dalam bentuk `{ id: "...", en: "..." }`.
- Untuk menambah bahasa baru: tambahkan ke tipe `Locale` dan `locales`, lalu salin satu kamus di `lib/locale.ts` serta isi field bahasa baru di `lib/data.ts`.

## Aset gambar

- `public/logo.webp` (huruf gelap, untuk latar terang) dan `public/logo-light.webp` (huruf putih, untuk latar gelap). Dipakai lewat `components/logo.tsx`.
- Maskot: `mascot.webp` (hero), `mascot-point.webp` (kontak), `mascot-confused.webp` (404), `mascot-head.webp` (halaman `/verify`).
- Favicon dan ikon layar utama: `app/icon.png`, `app/apple-icon.png`.

## Verifikasi keamanan (Cloudflare Turnstile)

Halaman `/verify` menampilkan widget Cloudflare Turnstile ("Verifying Your Connection"). Pengunjung baru harus lolos verifikasi sebelum membuka situs; setelah lolos, cookie `cusya-verified` (24 jam) dipasang.

Cara mengaktifkan:
1. Buka dash.cloudflare.com → **Turnstile** → **Add widget**. Mode **Managed**, tambahkan domain situs (mis. `cusya-webe.vercel.app` dan domain kustom).
2. Salin **Site Key** dan **Secret Key**.
3. Di Vercel → Project → Settings → Environment Variables, tambahkan `NEXT_PUBLIC_TURNSTILE_SITE_KEY` dan `TURNSTILE_SECRET_KEY`, lalu **redeploy** (variabel `NEXT_PUBLIC_` ikut dibangun saat build).

Tanpa kedua variabel itu, gerbang otomatis nonaktif dan situs terbuka seperti biasa. Mesin pencari dan pratinjau link (Google, WhatsApp, Telegram, Discord, dll.) dibiarkan lewat supaya situs tetap bisa diindeks dan dibagikan; daftar ada di `proxy.ts`.
