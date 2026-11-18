"use client";
import { m } from "framer-motion";

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}

export function HoverLift({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={className} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      {children}
    </m.div>
  );
}
