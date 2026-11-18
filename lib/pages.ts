import { email } from "@/lib/data";
import type { L } from "@/lib/locale";

// ============================================================
// HALAMAN TEKS (Privacy, Terms, Docs). Semua teks dua bahasa.
// Section: h = judul, p = paragraf, ul = daftar bullet, ol = daftar bernomor.
// Ini template umum — sesuaikan dengan kebijakan bisnis Cusya yang sebenarnya.
// ============================================================
const l = (id: string, en: string): L => ({ id, en });

export type Section = { h: L; p?: L[]; ul?: L[]; ol?: L[] };
export type DocPage = { eyebrow: L; title: L; intro: L; toc?: boolean; sections: Section[] };

export const pagesUpdated = "2026-10-26"; // YYYY-MM-DD

export type PageSlug = "privacy" | "terms" | "docs";

export const pages: Record<PageSlug, DocPage> = {
  privacy: {
    eyebrow: l("LEGAL", "LEGAL"),
    title: l("Kebijakan Privasi", "Privacy Policy"),
    intro: l(
      "Kebijakan ini menjelaskan informasi apa yang dikumpulkan Cusya saat kamu memakai situs dan membeli produk kami, serta bagaimana informasi itu dipakai.",
      "This policy explains what information Cusya collects when you use our site and buy our products, and how that information is used."
    ),
    sections: [
      { h: l("Informasi yang kami kumpulkan", "Information we collect"), p: [
        l("Kami hanya mengumpulkan informasi yang kamu berikan sendiri, misalnya alamat email dan isi pesan saat menghubungi kami lewat email atau Discord, serta detail pesanan yang diperlukan untuk mengirim produk.", "We only collect information you give us yourself, such as your email address and message when you contact us by email or Discord, and the order details needed to deliver your product."),
        l("Saat ini situs ini tidak meminta pembuatan akun dan tidak memuat pelacak iklan.", "This site currently does not require an account and does not load advertising trackers."),
      ] },
      { h: l("Cookie", "Cookies"), p: [
        l("Kami memakai satu cookie fungsional bernama cusya-lang untuk mengingat pilihan bahasamu (Indonesia atau English). Cookie ini berlaku sekitar satu tahun dan tidak dipakai untuk melacak kamu.", "We use a single functional cookie called cusya-lang to remember your language choice (Indonesian or English). It lasts about one year and is not used to track you."),
        l("Jika verifikasi keamanan aktif, kami juga memasang cookie cusya-verified (berlaku 24 jam) sebagai tanda bahwa kamu sudah lolos verifikasi.", "If security verification is enabled, we also set a cookie called cusya-verified (valid for 24 hours) to show that you have passed verification."),
      ] },
      { h: l("Data teknis", "Technical data"), p: [
        l("Penyedia hosting kami dapat mencatat data teknis standar seperti alamat IP, jenis browser, dan waktu akses untuk menjaga keamanan dan kelancaran layanan.", "Our hosting provider may log standard technical data such as IP address, browser type, and access time to keep the service secure and running smoothly."),
      ] },
      { h: l("Cara kami memakai informasi", "How we use information"), ul: [
        l("Membalas pertanyaan dan permintaanmu.", "Replying to your questions and requests."),
        l("Memproses pesanan dan memberi akses ke produk.", "Processing orders and giving you access to products."),
        l("Menjaga keamanan dan memperbaiki layanan.", "Keeping the service secure and improving it."),
      ] },
      { h: l("Berbagi informasi", "Sharing information"), p: [
        l("Kami tidak menjual datamu. Informasi hanya dibagikan kepada penyedia layanan yang diperlukan untuk menjalankan toko (misalnya hosting dan pemrosesan pembayaran), atau jika diwajibkan oleh hukum.", "We do not sell your data. Information is only shared with service providers needed to run the store (for example hosting and payment processing), or when required by law."),
        l("Verifikasi keamanan memakai Cloudflare Turnstile, yang memproses data teknis (seperti alamat IP) untuk membedakan manusia dari bot.", "Security verification uses Cloudflare Turnstile, which processes technical data (such as your IP address) to tell humans from bots."),
      ] },
      { h: l("Penyimpanan dan keamanan", "Retention and security"), p: [
        l("Kami menyimpan informasi selama dibutuhkan untuk tujuan di atas, lalu menghapusnya. Kami berusaha menjaga keamanan datamu, tetapi tidak ada sistem yang sepenuhnya bebas risiko.", "We keep information only as long as needed for the purposes above, then delete it. We work to keep your data safe, but no system is completely free of risk."),
      ] },
      { h: l("Hakmu", "Your rights"), p: [
        l("Kamu bisa meminta akses, koreksi, atau penghapusan datamu kapan saja dengan menghubungi kami.", "You can ask to access, correct, or delete your data at any time by contacting us."),
      ] },
      { h: l("Perubahan dan kontak", "Changes and contact"), p: [
        l(`Kebijakan ini dapat diperbarui dari waktu ke waktu; tanggal pembaruan terakhir ada di bagian atas halaman. Pertanyaan? Hubungi ${email}.`, `We may update this policy from time to time; the latest update date is shown at the top of the page. Questions? Contact ${email}.`),
      ] },
    ],
  },

  terms: {
    eyebrow: l("LEGAL", "LEGAL"),
    title: l("Syarat & Ketentuan", "Terms of Service"),
    intro: l(
      "Dengan memakai situs dan membeli produk Cusya, kamu menyetujui syarat berikut. Mohon baca dengan teliti.",
      "By using our site and buying Cusya products, you agree to the terms below. Please read them carefully."
    ),
    sections: [
      { h: l("Produk digital", "Digital products"), p: [
        l("Cusya menjual produk digital: template website, software dan lisensi, bot dan script, serta cloud hosting. Deskripsi produk dibuat seakurat mungkin, namun dapat berubah sewaktu-waktu.", "Cusya sells digital products: website templates, software and licenses, bots and scripts, and cloud hosting. Product descriptions are kept as accurate as possible but may change at any time."),
      ] },
      { h: l("Pesanan dan pembayaran", "Orders and payment"), p: [
        l("Pesanan dianggap selesai setelah pembayaran kami terima dan dikonfirmasi. Harga dan metode pembayaran ditampilkan saat pemesanan.", "An order is complete once we have received and confirmed your payment. Prices and payment methods are shown when you order."),
      ] },
      { h: l("Pengiriman dan akses", "Delivery and access"), p: [
        l("Produk dikirim atau diaktifkan setelah pembayaran terkonfirmasi, biasanya lewat email atau Discord. Pastikan kontak yang kamu berikan benar.", "Products are delivered or activated once payment is confirmed, usually by email or Discord. Please make sure the contact details you give us are correct."),
      ] },
      { h: l("Lisensi penggunaan", "License to use"), p: [
        l("Setelah membeli, kamu mendapat lisensi pribadi, tidak eksklusif, dan tidak dapat dipindahtangankan untuk memakai produk sesuai ketentuan produk tersebut. Dilarang menjual ulang, membagikan, atau mendistribusikan ulang produk kecuali diizinkan secara tertulis.", "After purchase you receive a personal, non-exclusive, non-transferable license to use the product according to its terms. Reselling, sharing, or redistributing a product is not allowed unless permitted in writing."),
      ] },
      { h: l("Pengembalian dana", "Refunds"), p: [
        l("Karena bersifat digital, pembelian umumnya tidak dapat dikembalikan setelah produk dikirim atau diaktifkan. Jika produk bermasalah atau tidak sesuai deskripsi, hubungi kami dan kami akan membantu memperbaikinya atau mempertimbangkan pengembalian dana.", "Because products are digital, purchases are generally non-refundable once delivered or activated. If a product is faulty or not as described, contact us and we will help fix it or consider a refund."),
      ] },
      { h: l("Penggunaan cloud hosting", "Cloud hosting use"), p: [
        l("Layanan hosting tidak boleh dipakai untuk konten ilegal, malware, spam, atau serangan terhadap pihak lain. Kami dapat menangguhkan layanan yang melanggar ketentuan ini.", "Hosting services must not be used for illegal content, malware, spam, or attacks on others. We may suspend services that break these rules."),
      ] },
      { h: l("Hak kekayaan intelektual", "Intellectual property"), p: [
        l("Merek, desain, dan konten Cusya dilindungi hak cipta. Hak atas produk atau materi pihak ketiga tetap dimiliki pemiliknya masing-masing.", "Cusya's brand, designs, and content are protected by copyright. Rights to third-party products or materials remain with their respective owners."),
      ] },
      { h: l("Batasan tanggung jawab", "Limitation of liability"), p: [
        l("Layanan diberikan sebagaimana adanya. Sejauh diizinkan hukum, Cusya tidak bertanggung jawab atas kerugian tidak langsung, kehilangan data, atau kehilangan keuntungan akibat penggunaan produk.", "Services are provided as is. To the extent permitted by law, Cusya is not liable for indirect loss, data loss, or lost profits arising from use of the products."),
      ] },
      { h: l("Hukum, perubahan, dan kontak", "Governing law, changes, and contact"), p: [
        l(`Syarat ini tunduk pada hukum Republik Indonesia. Kami dapat memperbarui syarat ini; terus memakai layanan berarti kamu menerima versi terbaru. Pertanyaan? Hubungi ${email}.`, `These terms are governed by the laws of the Republic of Indonesia. We may update them; continuing to use the service means you accept the latest version. Questions? Contact ${email}.`),
      ] },
    ],
  },

  docs: {
    eyebrow: l("DOKUMENTASI", "DOCUMENTATION"),
    title: l("Dokumentasi", "Documentation"),
    intro: l(
      "Panduan singkat untuk memesan dan memakai produk Cusya.",
      "A short guide to ordering and using Cusya products."
    ),
    toc: true,
    sections: [
      { h: l("Memulai", "Getting started"), ol: [
        l("Pilih produk di bagian Layanan.", "Pick a product in the Services section."),
        l("Hubungi kami lewat Discord atau email untuk memesan.", "Contact us on Discord or by email to order."),
        l("Lakukan pembayaran sesuai petunjuk yang kami kirim.", "Complete payment following the instructions we send."),
        l("Terima akses atau berkas produk setelah pembayaran terkonfirmasi.", "Receive your access or product files once payment is confirmed."),
      ] },
      { h: l("Template & Website", "Templates & Websites"), ol: [
        l("Unduh berkas template dari tautan yang kami kirim.", "Download the template files from the link we send."),
        l("Ekstrak berkas dan buka README untuk daftar kebutuhan.", "Extract the files and open the README for requirements."),
        l("Ganti teks, gambar, dan warna sesuai brand-mu.", "Replace the text, images, and colors to match your brand."),
        l("Unggah ke hosting pilihanmu, termasuk Cloud Hosting Cusya.", "Upload it to the hosting of your choice, including Cusya Cloud Hosting."),
      ] },
      { h: l("Software & Lisensi", "Software & Licenses"), p: [
        l("Kamu akan menerima kunci lisensi atau tautan aktivasi beserta panduannya. Simpan kunci di tempat yang aman dan pakai sesuai jumlah perangkat yang tertera pada produk.", "You will receive a license key or activation link along with a guide. Keep the key somewhere safe and use it on no more devices than the product allows."),
      ] },
      { h: l("Bot & Script", "Bots & Scripts"), ol: [
        l("Siapkan lingkungan yang dibutuhkan (misalnya versi Node.js yang tercantum di README).", "Prepare the required environment (for example the Node.js version listed in the README)."),
        l("Salin berkas ke server atau komputermu, lalu isi konfigurasi dan token di berkas .env.", "Copy the files to your server or computer, then fill in the configuration and token in the .env file."),
        l("Jalankan sesuai perintah di README.", "Run it using the commands in the README."),
      ], p: [
        l("Jangan pernah membagikan token bot kepada siapa pun.", "Never share your bot token with anyone."),
      ] },
      { h: l("Cloud Hosting", "Cloud Hosting"), ol: [
        l("Pilih paket dan hubungi kami untuk aktivasi.", "Choose a plan and contact us to activate it."),
        l("Kami mengirim detail akses ke server atau panelmu.", "We send you the access details for your server or panel."),
        l("Arahkan domain sesuai petunjuk, lalu unggah situsmu.", "Point your domain as instructed, then upload your site."),
      ], p: [
        l("Buat cadangan data pentingmu secara berkala.", "Back up your important data regularly."),
      ] },
      { h: l("Bantuan", "Help"), p: [
        l(`Mengalami kendala? Hubungi kami lewat Discord atau ${email}, sertakan nama produk dan penjelasan singkat masalahmu. Cek juga halaman Status untuk informasi gangguan.`, `Having trouble? Contact us on Discord or at ${email} with the product name and a short description of the problem. You can also check the Status page for any known issues.`),
      ] },
    ],
  },
};
