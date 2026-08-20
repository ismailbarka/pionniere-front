"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/i18n";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { PageTransition, FadeIn } from "@/components/layout/PageTransition";
import { InlineLoader } from "@/components/layout/LoadingOverlay";
import {
  Settings as SettingsIcon,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  User as UserIcon,
} from "lucide-react";

function SettingsContent() {
  const { user, updateLevel, isBusy, message: authMessage } = useAuth();
  const { t, locale } = useLocale();

  const [selectedLevel, setSelectedLevel] = useState<number>(user?.schoolLevel || 1);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user?.schoolLevel) {
      setSelectedLevel(user.schoolLevel);
    }
  }, [user?.schoolLevel]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateLevel(selectedLevel);
      setSuccessMessage(t.settings.success);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : authMessage || "Error updating level";
      setErrorMessage(msg);
    }
  }

  const isRtl = locale === "ar";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <PageTransition>
      <main className="settings-page">
        <div className="settings-container">
          <FadeIn>
            {/* Top Navigation / Breadcrumb */}
            <div className="settings-header-nav">
              <Link href="/subjects" className="settings-back-link">
                <BackIcon className="w-4 h-4" />
                <span>{t.settings.backToSubjects}</span>
              </Link>
            </div>

            {/* Page Header */}
            <div className="settings-header">
              <div className="settings-header__icon">
                <SettingsIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="settings-header__title">{t.settings.title}</h1>
                <p className="settings-header__lead">{t.settings.lead}</p>
              </div>
            </div>

            {/* Account Info Summary Card */}
            <div className="settings-user-card">
              <div className="settings-user-card__avatar">
                {(user?.username || user?.email || "U").charAt(0).toUpperCase()}
              </div>
              <div className="settings-user-card__info">
                <div className="settings-user-card__name">
                  <UserIcon className="w-4 h-4 text-blue-500 inline mr-1" />
                  <span>{user?.username || user?.email}</span>
                </div>
                <div className="settings-user-card__meta">
                  <span className="settings-badge">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {user?.schoolLevel ? t.levels[user.schoolLevel] : t.settings.currentLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Feedback messages */}
            {successMessage && (
              <div className="settings-alert settings-alert--success">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="settings-alert settings-alert--error">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Main Level Selector Form */}
            <form className="settings-card" onSubmit={handleSave}>
              <div className="settings-card__header">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h2 className="settings-card__title">{t.settings.selectLevel}</h2>
                </div>
                <p className="settings-card__subtitle">
                  {t.settings.currentLevel}: <strong>{user?.schoolLevel ? t.levels[user.schoolLevel] : "—"}</strong>
                </p>
              </div>

              <div className="settings-level-grid">
                {[1, 2, 3, 4, 5, 6].map((level) => {
                  const isSelected = selectedLevel === level;
                  const isCurrent = user?.schoolLevel === level;

                  return (
                    <button
                      type="button"
                      key={level}
                      onClick={() => {
                        setSelectedLevel(level);
                        setSuccessMessage("");
                      }}
                      className={`settings-level-card ${isSelected ? "is-selected" : ""} ${
                        isCurrent ? "is-current" : ""
                      }`}
                    >
                      <div className="settings-level-card__header">
                        <span className="settings-level-card__number">{level}</span>
                        {isSelected && (
                          <span className="settings-level-card__check">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                      <span className="settings-level-card__label">{t.levels[level]}</span>
                      {isCurrent && (
                        <span className="settings-level-card__current-tag">
                          {t.settings.currentLevel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="settings-card__footer">
                <Link href="/subjects" className="btn btn--ghost">
                  {t.settings.backToSubjects}
                </Link>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={isBusy || selectedLevel === user?.schoolLevel}
                >
                  {isBusy ? (
                    <InlineLoader label={t.settings.saving} />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t.settings.save}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </main>
    </PageTransition>
  );
}

export default function SettingsPage() {
  return (
    <RequireAuth>
      <SettingsContent />
    </RequireAuth>
  );
}
