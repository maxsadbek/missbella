import { ArrowRight, Heart, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";

import { BuyButton } from "@/components/ui/BuyButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/config";
import { STORE_IMAGE, TEAM_IMAGES } from "@/data/products";
import { usePageMeta } from "@/hooks/usePageMeta";

const TEAM = [
  { name: "Nilufar Karimova", role: "Asoschi va kreativ direktor" },
  { name: "Madina Yusupova", role: "Bosh stilist" },
  { name: "Zilola Rahimova", role: "Mijozlar bilan ishlash menejeri" },
];

const VALUES = [
  {
    icon: Sparkles,
    title: "Sifat",
    text: "Har bir model sifatli mato va aniq kesim bilan diqqat bilan tanlanadi.",
  },
  {
    icon: Heart,
    title: "Individual yondashuv",
    text: "Har bir mijozga o'lcham va uslub bo'yicha bepul maslahat beramiz.",
  },
  {
    icon: Truck,
    title: "Tez yetkazib berish",
    text: "Buyurtma 1–3 kun ichida yetkaziladi, Toshkent bo'ylab bepul.",
  },
];

export function AboutPage() {
  usePageMeta(
    `Biz haqimizda — ${SITE.name}`,
    `${SITE.name} brendining hikoyasi, missiyasi va qadriyatlari.`
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
      <SectionHeading
        eyebrow="Biz haqimizda"
        title={
          <>
            Uslub — bu <span className="italic text-brand-500">hikoya</span>
          </>
        }
        description="MissBella — bu shunchaki do'kon emas. Bu har bir ayolning o'ziga xosligini ta'kidlaydigan kiyimlarni tanlashga yordam beradigan joy."
        align="center"
      />

      {/* Brend hikoyasi */}
      <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src={STORE_IMAGE}
            alt="MissBella do'koni"
            className="aspect-[4/5] w-full border border-brand-100 object-cover"
          />
        </div>
        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
            Brend hikoyasi
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-wide text-brand-950 md:text-4xl">
            Kichik kolleksiyadan boshlangan yo'l
          </h2>
          <p className="mt-6 leading-relaxed text-brand-700">
            {SITE.foundedYear}-yilda kichik studiyadan boshlangan MissBella bugun
            ayollar kiyimida o'z o'rnini topgan brendga aylandi. Biz har doim
            bitta tamoyilga amal qildik: sifatni yuzaki emas, balki har bir
            tikuvda his qilish kerak.
          </p>
          <p className="mt-4 leading-relaxed text-brand-700">
            Bugungi kunda katalogimizda ko'ylaklar, yubkalar, bluzkalar va
            kostyumlar — kundalik hayotdan maxsus tadbirlargacha barcha holatlar
            uchun tanlov mavjud. Va ularning barchasini Telegram orqali, bir
            necha daqiqada buyurtma qilish mumkin.
          </p>
          <blockquote className="mt-8 border-l-2 border-brand-500 pl-6 font-display text-2xl italic leading-snug text-brand-950">
            «Har bir ayol o'z uslubida chiroyli — biz faqat buni ko'rsatishga
            yordam beramiz.»
          </blockquote>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600">
            — MissBella jamoasi
          </p>
        </div>
      </div>

      {/* Missiya */}
      <div className="mt-24 bg-brand-500 px-8 py-16 md:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white">
            Missiyamiz
          </p>
          <p className="mt-5 font-display text-3xl leading-[1.2] tracking-wide text-white md:text-4xl">
            Ayollarga o'z go'zalligi va uslubini kashf etishga yordam berish —
            oddiy va tushunarli tarzda.
          </p>
        </div>
      </div>

      {/* Qadriyatlar */}
      <div className="mt-24">
        <SectionHeading eyebrow="Qadriyatlar" title="Nimaga ishonamiz" />
        <div className="grid grid-cols-1 gap-px border border-brand-100 bg-brand-100 md:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="bg-white px-8 py-12">
              <value.icon className="size-8 text-brand-500" />
              <h3 className="mt-6 font-display text-2xl text-brand-950">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-700">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Jamoa */}
      <div className="mt-24">
        <SectionHeading
          eyebrow="Jamoa"
          title="Orqamizda turgan insonlar"
          description="Rasmlar va ismlar namunaviy — haqiqiy jamoa bilan almashtiriladi."
        />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {TEAM.map((member, index) => (
            <div key={member.name} className="group">
              <div className="relative overflow-hidden border border-brand-100">
                <img
                  src={TEAM_IMAGES[index]}
                  alt={member.name}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
              </div>
              <h3 className="mt-5 font-display text-xl text-brand-950">
                {member.name}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-col items-center gap-6 border-t border-brand-100 pt-16 text-center">
        <h2 className="font-display text-3xl tracking-wide text-brand-950 md:text-4xl">
          Kolleksiyamiz bilan tanishing
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 border border-brand-500 bg-brand-500 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600"
          >
            Katalogga o'tish
            <ArrowRight className="size-4" />
          </Link>
          <BuyButton variant="outline" label="Telegramda bog'lanish" />
        </div>
      </div>
    </section>
  );
}
