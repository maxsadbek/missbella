import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Sahifa o'zgarganda scroll'ni tepaga qaytaradi. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
