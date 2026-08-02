import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { EASE, VIEWPORT } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Kechikish (sekundlarda) — ketma-ket kirish effekti uchun. */
  delay?: number;
  /** Boshlang'ich vertikal siljish (px). */
  y?: number;
}

/**
 * Scroll paytida element ekranga kirganda "slide up + fade" bilan ochiladi.
 * Butun sayt bo'ylab bir xil, jimgina animatsiya ta'minlaydi.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
