"use client";

import { useTranslations } from "next-intl";
import { usePageMeta } from "@/lib/hooks";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TeacherCard, type TeacherItem } from "@/components/teachers/TeacherCard";
import { CTASection } from "@/components/home/CTASection";

export default function TeachersPage() {
  const t = useTranslations("teachers");
  usePageMeta(`${t("title")} — 20-maktab`);

  const items = t.raw("items") as TeacherItem[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {items.map((teacher, i) => (
            <TeacherCard key={teacher.name} teacher={teacher} index={i} />
          ))}
        </div>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
    </>
  );
}
