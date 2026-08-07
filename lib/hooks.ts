"use client";

import { useEffect } from "react";

/** Sets document.title and scrolls to top when the page changes. */
export function usePageMeta(title?: string) {
  useEffect(() => {
    if (title) document.title = title;
    document.documentElement.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title]);
}
