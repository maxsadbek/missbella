import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { TelegramCta } from "@/components/sections/TelegramCta";
import { SITE } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";

export function HomePage() {
  usePageMeta(`${SITE.name} — ${SITE.tagline}`, SITE.description);

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <TelegramCta />
    </>
  );
}
