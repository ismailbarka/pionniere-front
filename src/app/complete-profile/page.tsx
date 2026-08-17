"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/i18n";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { PageTransition, FadeIn } from "@/components/layout/PageTransition";
import { InlineLoader } from "@/components/layout/LoadingOverlay";
import { Sparkles, User, GraduationCap, CheckCircle2 } from "lucide-react";

function CompleteProfileForm() {
  const { completeProfile, isBusy, message } = useAuth();
  const { t } = useLocale();
  const [username, setUsername] = useState("");
  const [schoolLevel, setSchoolLevel] = useState<number>(1);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await completeProfile(username, schoolLevel);
  }

  return (
    <PageTransition>
      <section className="auth-shell" style={{ justifyContent: 'center', minHeight: '70vh' }}>
        <FadeIn>
          <form className="auth-card" onSubmit={handleSubmit} style={{ maxWidth: '520px', margin: '0 auto', width: '100%' }}>
            <div className="auth-card__body">
              <div className="auth-card__intro">
                <p className="auth-card__eyebrow">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                  {t.profile.eyebrow}
                </p>
                <h2>{t.profile.title}</h2>
                <p>{t.profile.lead}</p>
              </div>

              {message && (
                <div className="auth-message auth-message--error" style={{ marginBottom: '16px' }}>
                  <p>{message}</p>
                </div>
              )}

              <label className="field">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-600" />
                  {t.profile.usernameLabel}
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t.profile.usernamePlaceholder}
                  required
                  minLength={3}
                />
              </label>

              <label className="field">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  {t.profile.schoolLevelLabel}
                </span>
                <select
                  value={schoolLevel}
                  onChange={(e) => setSchoolLevel(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    outline: 'none',
                    marginTop: '6px'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <option value={level} key={level}>
                      {t.levels[level]}
                    </option>
                  ))}
                </select>
              </label>

              <button
                className="btn btn--primary btn--block"
                disabled={isBusy || !username.trim()}
                type="submit"
                style={{ marginTop: '16px' }}
              >
                {isBusy ? <InlineLoader label={t.profile.saving} /> : t.profile.saveAndContinue}
              </button>
            </div>
          </form>
        </FadeIn>
      </section>
    </PageTransition>
  );
}

export default function CompleteProfilePage() {
  return (
    <RequireAuth>
      <CompleteProfileForm />
    </RequireAuth>
  );
}
