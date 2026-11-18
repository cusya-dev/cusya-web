import { Footer } from "@/components/footer";
import { LocaleTransition } from "@/components/locale-transition";
import { Navbar } from "@/components/navbar";

// Kerangka bersama: navbar + konten + footer (dipakai beranda dan halaman lain).
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <LocaleTransition>
        <main>{children}</main>
        <Footer />
      </LocaleTransition>
    </div>
  );
}
