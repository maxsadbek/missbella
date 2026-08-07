"use client";

import { useTranslations } from "next-intl";
import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type TeacherItem = {
  name: string;
  subject: string;
  exp: string;
  bio: string;
};

const GRADIENTS = [
  "from-[#0A84FF] to-[#0066FF]",
  "from-[#0066FF] to-[#0a2e6b]",
  "from-[#4DA3FF] to-[#0A84FF]",
  "from-[#0a2e6b] to-[#0A84FF]",
];

export function TeacherCard({
  teacher,
  index,
}: {
  teacher: TeacherItem;
  index: number;
}) {
  const t = useTranslations("teachers");
  const initials = teacher.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Reveal delay={(index % 4) * 0.08} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-[6px] border border-line bg-surface p-7 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_30px_-12px_rgba(0,102,255,0.3)]">
        <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/15" />

        <div className="relative flex items-center gap-4">
          <div
            className={`grid h-16 w-16 shrink-0 place-items-center rounded-[6px] bg-gradient-to-br font-display text-xl font-extrabold text-white shadow-[0_12px_30px_-12px_rgba(0,102,255,0.8)] ${GRADIENTS[index % GRADIENTS.length]}`}
          >
            {initials}
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-ink transition-colors duration-300 group-hover:text-primary">
              {teacher.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary">
              <GraduationCap className="h-4 w-4" />
              {teacher.subject}
            </p>
          </div>
        </div>

        <div className="relative mt-5 inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
          {teacher.exp} {t("experience")}
        </div>

        <p className="relative mt-4 text-sm leading-relaxed text-ink-soft">
          {teacher.bio}
        </p>
      </div>
    </Reveal>
  );
}
