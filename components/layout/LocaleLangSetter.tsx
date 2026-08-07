"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

/** Keeps <html lang> in sync with the active locale (incl. on direct load). */
export function LocaleLangSetter() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
