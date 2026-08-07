"use client";

import { useTranslations } from "next-intl";
import { usePageMeta } from "@/lib/hooks";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Intro } from "@/components/home/Intro";
import { FeaturedNews } from "@/components/home/FeaturedNews";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  const t = useTranslations("meta");
  usePageMeta(t("title"));

  return (
    <>
      <Hero />
      <Stats />
      <Intro />
      <FeaturedNews />
      <AboutPreview />
      <CTASection />
    </>
  );
}
