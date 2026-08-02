import { useEffect } from "react";

/**
 * Har bir sahifada SEO title va description meta teglarini o'rnatadi.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
