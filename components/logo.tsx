import Image from "next/image";
import { cn } from "@/lib/utils";

// Logo Cusya (ikon CY).
// variant="dark"  → huruf gelap, untuk latar terang (navbar, footer, 404).
// variant="light" → huruf putih, untuk latar gelap/berwarna.
export function Logo({ className, variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  return (
    <Image
      src={variant === "dark" ? "/logo.webp" : "/logo-light.webp"}
      alt="Cusya"
      width={512}
      height={512}
      unoptimized
      className={cn("shrink-0 object-contain", className)}
    />
  );
}
