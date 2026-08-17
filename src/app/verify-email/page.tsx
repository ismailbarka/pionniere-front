"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import { request, getErrorMessage } from "@/lib/api";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { PageTransition, FadeIn } from "@/components/layout/PageTransition";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { t } = useLocale();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setSuccess(false);
      setMessage(t.verifyEmail.missingToken);
      return;
    }

    void (async () => {
      try {
        const res = await request<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`);
        setSuccess(true);
        setMessage(res.message || t.verifyEmail.successTitle);
      } catch (err) {
        setSuccess(false);
        setMessage(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [token, t]);

  if (loading) {
    return <LoadingOverlay label={t.verifyEmail.loading} />;
  }

  return (
    <PageTransition>
      <section className="auth-shell" style={{ justifyContent: 'center', minHeight: '70vh' }}>
        <FadeIn>
          <div className="auth-card" style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
            <div className="auth-card__body" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                {success ? (
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 animate-bounce" />
                ) : (
                  <XCircle className="w-16 h-16 text-rose-600" />
                )}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
                {success ? t.verifyEmail.successTitle : t.verifyEmail.errorTitle}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                {message}
              </p>
              <div>
                <Link href="/login" className="btn btn--primary btn--block">
                  {t.verifyEmail.goToLogin}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  );
}

export default function VerifyEmailPage() {
  const { t } = useLocale();

  return (
    <Suspense fallback={<LoadingOverlay label={t.common.loading} />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
