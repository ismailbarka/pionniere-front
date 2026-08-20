"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import type { AuthMode } from "@/lib/types";
import { useLocale } from "@/lib/i18n";
import { FadeIn, PageTransition } from "@/components/layout/PageTransition";
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
} from "lucide-react";

declare global {
  interface Window {
    __googleGsiInitialized?: boolean;
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

type AuthFormProps = {
  initialMode?: AuthMode;
  switchHref?: string;
  backHref?: string;
};

export function AuthForm({ initialMode = "login", switchHref }: AuthFormProps) {
  const { login, register, googleLogin, resendVerification, message } = useAuth();
  const { t } = useLocale();
  const [authMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Load Google GSI script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.id) {
        if (!window.__googleGsiInitialized) {
          const googleClientId =
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
            "283771604701-p0qc84oc0i4jka8qhe3jbgrv6otd2dak.apps.googleusercontent.com";

          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: (response: { credential?: string }) => {
              if (response.credential) {
                void googleLogin(response.credential);
              }
            },
          });
          window.__googleGsiInitialized = true;
        }
        const target = document.getElementById("googleBtn");
        if (target) {
          window.google.accounts.id.renderButton(target, {
            theme: "outline",
            size: "large",
            width: 320,
            text: authMode === "login" ? "signin_with" : "signup_with",
          });
        }
      }
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [authMode, googleLogin]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if (authMode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
        setIsSubmitted(true);
      }
    } catch {
      // Error message is stored in authContext message state
    }
  }

  const isLogin = authMode === "login";
  const heroBullets = isLogin ? t.auth.loginHero : t.auth.signupHero;

  return (
    <PageTransition>
      <section className="auth-shell">
        <FadeIn>
          <div className="auth-hero">
            <div className="auth-hero__illustration-wrapper">
              <Image
                src="/auth-illustration.jpg"
                alt="Education Illustration"
                width={240}
                height={240}
                className="auth-hero__illustration"
                priority
              />
            </div>
            <h1>{isLogin ? t.auth.loginTitle : t.auth.signupTitle}</h1>
            <p className="auth-hero__copy">{isLogin ? t.auth.loginCopy : t.auth.signupCopy}</p>
            <div className="auth-hero__stats">
              <div className="stat-card">
                <strong>01</strong>
                <span>{heroBullets[0]}</span>
              </div>
              <div className="stat-card">
                <strong>02</strong>
                <span>{heroBullets[1]}</span>
              </div>
              <div className="stat-card">
                <strong>03</strong>
                <span>{heroBullets[2]}</span>
              </div>
            </div>
            <ul className="auth-hero__features">
              {t.home.betterItems.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <form className="auth-card" onSubmit={handleSubmit}>
            <div className="auth-card__body">
              <div className="auth-card__intro">
                <p className="auth-card__eyebrow">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                  {isLogin ? t.auth.loginIntroEyebrow : t.auth.signupIntroEyebrow}
                </p>
                <h2>{isLogin ? t.auth.loginIntroTitle : t.auth.signupIntroTitle}</h2>
                <p>{isLogin ? t.auth.loginIntroCopy : t.auth.signupIntroCopy}</p>
              </div>

              {message && (
                <div className={`auth-message ${isSubmitted ? "auth-message--success" : "auth-message--error"}`}>
                  <div className="flex items-center gap-2">
                    {isSubmitted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    )}
                    <p>{message}</p>
                  </div>
                  {authMode === "signup" && isSubmitted && (
                    <button
                      type="button"
                      className="btn btn--link"
                      onClick={() => void resendVerification(email)}
                      style={{ marginTop: '8px', fontSize: '0.85rem' }}
                    >
                      {t.auth.resendVerification}
                    </button>
                  )}
                </div>
              )}

              {(!isSubmitted || isLogin) && (
                <>
                  <div id="googleBtn" style={{ minHeight: '40px', width: '100%' }}></div>
                </>
              )}

              <p className="auth-card__footer">
                {isLogin ? t.auth.newHere : t.auth.alreadyHave}{" "}
                {switchHref ? (
                  <Link href={switchHref} className="text-link">
                    {isLogin ? t.auth.switchToSignup : t.auth.switchToLogin}
                  </Link>
                ) : null}
              </p>
            </div>
          </form>
        </FadeIn>
      </section>
    </PageTransition>
  );
}
