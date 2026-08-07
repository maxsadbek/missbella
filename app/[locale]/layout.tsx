import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { LocaleLangSetter } from "@/components/layout/LocaleLangSetter";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <AuthProvider>
          <LocaleLangSetter />
          <ScrollProgress />
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </AuthProvider>
      </MotionConfig>
    </NextIntlClientProvider>
  );
}
