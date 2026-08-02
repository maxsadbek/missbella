import type { Variants } from "framer-motion";

/**
 * MissBella animatsiya ritmi — barcha sahifalarda bir xil "premium" his.
 * Yumshoq, jimgina easing egri chizig'i.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Element ekranga kirganda bir marta ishga tushadigan viewport sozlamasi. */
export const VIEWPORT = { once: true, margin: "-60px" } as const;

/** Ro'yxat/grid elementlari uchun ketma-ket (stagger) kirish konteyneri. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/** staggerContainer ichidagi har bir elementning varianti. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
