"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRouter, Link } from "@/i18n/navigation";
import { usePageMeta } from "@/lib/hooks";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const DARK_INPUT =
  "border-white/15 bg-white/5 text-white placeholder:text-white/30";

function strengthScore(password: string) {
  let s = 0;
  if (password.length >= 8) s++;
  if (password.length >= 12) s++;
  if (/[0-9]/.test(password)) s++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  return s;
}

export default function RegisterPage() {
  const t = useTranslations("auth");
  usePageMeta(`${t("registerTitle")} — 20-maktab`);

  const { user, loading, register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect already-logged-in visitors away, but don't steal the success
  // screen right after a successful registration (success branch handles redirect).
  useEffect(() => {
    if (user && !loading && !success) router.replace("/");
  }, [user, loading, success, router]);

  const score = useMemo(() => strengthScore(password), [password]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = t("errors.nameShort");
    if (!email.trim()) e.email = t("errors.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = t("errors.emailInvalid");
    if (password.length < 8) e.password = t("errors.passwordShort");
    if (confirm !== password) e.confirm = t("errors.passwordMismatch");
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitting(true);
    setServerError(null);
    try {
      await register(name.trim(), email.trim(), password);
      setSuccess(true);
      setTimeout(() => router.replace("/"), 1000);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setServerError(
        code && t.has(`errors.${code}`)
          ? t(`errors.${code}`)
          : t("errors.invalidCredentials")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title={t("registerTitle")} subtitle={t("registerSubtitle")}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col items-center rounded-[6px] border border-primary/40 bg-primary/10 px-6 py-10 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-primary-bright" />
            <p className="mt-4 font-display text-lg font-bold text-white">
              {t("successRegister")}
            </p>
            <p className="mt-1 text-sm text-white/50">
              {t("welcome")}, {name.trim()}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-8 space-y-5"
          >
            <Input
              label={t("name")}
              labelClassName="text-white/75"
              type="text"
              name="name"
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              className={DARK_INPUT}
            />
            <Input
              label={t("email")}
              labelClassName="text-white/75"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              className={DARK_INPUT}
            />
            <div>
              <Input
                label={t("password")}
                labelClassName="text-white/75"
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                className={DARK_INPUT}
              />
              {password.length > 0 && (
                <div className="mt-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all duration-500",
                          i < score
                            ? score >= 4
                              ? "bg-primary-bright"
                              : score >= 2
                                ? "bg-primary/80"
                                : "bg-primary/50"
                            : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1.5 text-[11px] font-medium text-white/40">
                    {t("strength")}
                  </p>
                </div>
              )}
            </div>
            <Input
              label={t("confirm")}
              labelClassName="text-white/75"
              type="password"
              name="confirm"
              autoComplete="new-password"
              placeholder={t("confirmPlaceholder")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={errors.confirm}
              className={DARK_INPUT}
            />

            <AnimatePresence>
              {serverError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-[6px] border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-medium text-primary-bright"
                >
                  {serverError}
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" size="lg" loading={submitting} className="w-full">
              {submitting ? t("loading") : t("registerBtn")}
            </Button>

            <p className="text-center text-sm text-white/50">
              {t("haveAccount")}{" "}
              <Link
                href="/login"
                className="font-bold text-primary-bright transition-colors hover:text-white"
              >
                {t("toLogin")}
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
