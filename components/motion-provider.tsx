"use client";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

// LazyMotion + domAnimation menjaga bundle tetap kecil; reducedMotion="user" menghormati pengaturan perangkat.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>{children}</LazyMotion>
    </MotionConfig>
  );
}
