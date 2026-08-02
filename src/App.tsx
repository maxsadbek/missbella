import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import { EASE } from "@/lib/animations";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AboutPage } from "@/pages/AboutPage";
import { CatalogPage } from "@/pages/CatalogPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProductPage } from "@/pages/ProductPage";

/** Sahifalar orasidagi nozik fade + slide up o'tish. */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6, transition: { duration: 0.16, ease: "easeIn" } }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </div>
  );
}
