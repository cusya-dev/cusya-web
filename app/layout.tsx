import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { I18nProvider } from "@/components/i18n-provider";
import { MotionProvider } from "@/components/motion-provider";
import { RouteScrollReset } from "@/components/route-scroll-reset";
import { dict } from "@/lib/locale";
import { getLocale } from "@/lib/locale-server";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const viewport: Viewport = { themeColor: "#3A6CC4" };

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = dict[await getLocale()];
  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${font.variable} font-sans antialiased`}>
        <RouteScrollReset />
        <I18nProvider locale={locale}>
          <MotionProvider>{children}</MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
