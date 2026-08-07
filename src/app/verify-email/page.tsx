"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { request, getErrorMessage } from "@/lib/api";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { PageTransition, FadeIn } from "@/components/layout/PageTransition";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setSuccess(false);
      setMessage("Jeton de vérification manquant.");
      return;
    }

    void (async () => {
      try {
        const res = await request<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`);
        setSuccess(true);
        setMessage(res.message);
      } catch (err) {
        setSuccess(false);
        setMessage(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) {
    return <LoadingOverlay label="Vérification de votre adresse email en cours..." />;
  }

  return (
    <PageTransition>
      <section className="auth-shell" style={{ justifyContent: 'center', minHeight: '70vh' }}>
        <FadeIn>
          <div className="auth-card" style={{ maxWidth: '480px', margin: '0 auto', width: '100%' }}>
            <div className="auth-card__body" style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {success ? "✅" : "❌"}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
                {success ? "Email vérifié !" : "Échec de la vérification"}
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                {message}
              </p>
              <div>
                <Link href="/login" className="btn btn--primary btn--block">
                  Aller à la page de connexion
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
  return (
    <Suspense fallback={<LoadingOverlay label="Chargement..." />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
