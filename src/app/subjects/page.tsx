"use client";

import { Suspense } from "react";
import SubjectsContent from "./SubjectsContent";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { useLocale } from "@/lib/i18n";

function SubjectsLoadingFallback() {
  const { t } = useLocale();
  return <LoadingOverlay label={t.common.loadingSubjects} />;
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<SubjectsLoadingFallback />}>
      <SubjectsContent />
    </Suspense>
  );
}
