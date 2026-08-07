"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { PageTransition, FadeIn } from "@/components/layout/PageTransition";
import { InlineLoader } from "@/components/layout/LoadingOverlay";

function CompleteProfileForm() {
  const { completeProfile, isBusy, message } = useAuth();
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
                <p className="auth-card__eyebrow">Étape finale</p>
                <h2>Complétez votre profil</h2>
                <p>Pour accéder à la plateforme, veuillez remplir les informations ci-dessous.</p>
              </div>

              {message && (
                <div className="auth-message auth-message--error" style={{ marginBottom: '16px' }}>
                  <p>{message}</p>
                </div>
              )}

              <label className="field">
                <span>Nom d'utilisateur</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ex. mohamed_123"
                  required
                  minLength={3}
                />
              </label>

              <label className="field">
                <span>Niveau scolaire</span>
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
                  <option value={1}>1ère année (Niveau 1)</option>
                  <option value={2}>2ème année (Niveau 2)</option>
                  <option value={3}>3ème année (Niveau 3)</option>
                  <option value={4}>4ème année (Niveau 4)</option>
                  <option value={5}>5ème année (Niveau 5)</option>
                  <option value={6}>6ème année (Niveau 6)</option>
                </select>
              </label>

              <button
                className="btn btn--primary btn--block"
                disabled={isBusy || !username.trim()}
                type="submit"
                style={{ marginTop: '16px' }}
              >
                {isBusy ? <InlineLoader label="Enregistrement..." /> : "Enregistrer et continuer"}
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
