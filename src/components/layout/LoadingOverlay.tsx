"use client";

import { useLocale } from "@/lib/i18n";

const labelMap: Record<string, { fr: string; ar: string }> = {
  "Checking session": { fr: "Vérification de votre compte…", ar: "جارٍ التحقق من الحساب…" },
  "Redirecting": { fr: "Redirection vers votre espace…", ar: "جارٍ توجيهك إلى فضائك…" },
  "Restoring your session": { fr: "Restauration de votre session…", ar: "جارٍ استعادة الجلسة…" },
  "Opening your dashboard": { fr: "Ouverture de votre tableau de bord…", ar: "جارٍ فتح لوحة التحكم…" },
  "Loading your subjects": { fr: "Chargement de vos matières…", ar: "جارٍ تحميل المواد الدراسية…" },
  "Loading lesson list": { fr: "Chargement de la liste des leçons…", ar: "جارٍ تحميل قائمة الدروس…" },
  "Loading lesson": { fr: "Chargement de la leçon…", ar: "جارٍ تحميل الدرس…" },
  "Loading lessons": { fr: "Chargement des leçons…", ar: "جارٍ تحميل الدروس…" },
  "Loading placement test": { fr: "Chargement du test de niveau…", ar: "جارٍ تحميل اختبار المستوى…" },
  "Loading placement tests": { fr: "Chargement des tests de niveau…", ar: "جارٍ تحميل اختبارات المستوى…" },
  "Preparing your classroom": { fr: "Préparation de votre espace d'apprentissage…", ar: "جارٍ تجهيز فضائك التعليمي…" },
  "Submitting...": { fr: "Validation en cours…", ar: "جارٍ التحقق والتأكيد…" },
  "Saving...": { fr: "Enregistrement en cours…", ar: "جارٍ الحفظ…" },
  "Submitting": { fr: "Validation en cours…", ar: "جارٍ التحقق والتأكيد…" },
  "Working...": { fr: "Traitement en cours…", ar: "جارٍ المعالجة…" },
};

function localize(label: string, locale: "fr" | "ar") {
  return labelMap[label]?.[locale] || label;
}

export function LoadingOverlay({ label = "Loading" }: { label?: string }) {
  const { locale, t } = useLocale();
  const resolvedLabel =
    label === "Loading" ? t.common.loading : localize(label, locale) || label;

  return (
    <div className="loading-overlay" role="status" aria-live="polite" aria-label={resolvedLabel}>
      <div className="loading-overlay__card">
        <div className="loading-orb" aria-hidden="true">
          <span className="loading-orb__ring" />
          <span className="loading-orb__core" />
          <span className="loading-orb__dot loading-orb__dot--one" />
          <span className="loading-orb__dot loading-orb__dot--two" />
        </div>
        <div className="loading-overlay__text">
          <p>{resolvedLabel}</p>
          <span>{t.common.preparingClassroom}</span>
        </div>
        <div className="loading-skeleton" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export function InlineLoader({ label = "Working..." }: { label?: string }) {
  const { locale } = useLocale();
  const resolvedLabel = localize(label, locale) || label;

  return (
    <span className="inline-loader" role="status" aria-live="polite">
      <span className="inline-loader__dot" aria-hidden="true" />
      {resolvedLabel}
    </span>
  );
}
