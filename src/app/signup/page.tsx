"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/i18n";
import { AuthForm } from "@/components/auth/AuthForm";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";

export default function SignupPage() {
  const router = useRouter();
  const { user, isInitializing } = useAuth();
  const { t } = useLocale();

  useEffect(() => {
    if (isInitializing || !user) return;
    router.replace(user.role === "ADMIN" ? "/admin/subjects" : "/subjects");
  }, [isInitializing, user, router]);

  if (isInitializing) {
    return <LoadingOverlay label={t.common.checkingSession} />;
  }

  if (user) {
    return <LoadingOverlay label={t.common.redirecting} />;
  }

  return (
    <AuthForm initialMode="signup" switchHref="/login" backHref="/" />
  );
}
