"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/i18n";
import { API_URL, getErrorMessage } from "@/lib/api";
import type { Subject } from "@/lib/types";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { FadeIn, PageTransition } from "@/components/layout/PageTransition";
import { 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  BookMarked,
  Calculator,
  Atom,
  Globe,
  Code,
  Palette,
  Brain,
  Languages
} from "lucide-react";

const subjectLucideIcons = [Calculator, Atom, BookMarked, Globe, Code, Palette, Brain, Languages];

export default function SubjectsContent() {
  const searchParams = useSearchParams();
  const { user, token, authHeaders, authFetch, setMessage } = useAuth();
  const { locale, t } = useLocale();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const placed = searchParams.get("placed") === "1";

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setMessage("");

      try {
        const response = await authFetch(`/subjects`, {
          headers: authHeaders.Authorization ? authHeaders : { Authorization: `Bearer ${token}` },
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          const text = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
          throw new Error(text || "Request failed");
        }
        setSubjects(data as Subject[]);
      } catch (error) {
        setMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    if (token) void load();
  }, [token, authHeaders, authFetch, setMessage]);

  return (
    <RequireAuth role="STUDENT">
      {isLoading ? (
        <LoadingOverlay label={t.common.loadingSubjects} />
      ) : (
        <PageTransition>
          <section className="page-shell">
            <header className="page-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', width: '100%' }}>
                <div>
                  <p className="eyebrow flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    {t.common.lessonPath}
                  </p>
                  <h1>{t.subjects.title}</h1>
                  <p className="page-header__lead">{t.subjects.lead}</p>
                  {user?.schoolLevel ? (
                    <div style={{ marginTop: '12px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 18px',
                          borderRadius: '9999px',
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(99, 102, 241, 0.12))',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: 'var(--primary-hover)',
                          fontWeight: '700',
                          fontSize: '0.9rem'
                        }}
                      >
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        {t.levels[user.schoolLevel] || t.common.levelBadge(user.schoolLevel)}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="page-header__illustration-box">
                  <Image
                    src="/learning-illustration.jpg"
                    alt="Learning Curriculum"
                    width={130}
                    height={130}
                    className="page-header__illustration"
                    priority
                  />
                </div>
              </div>
            </header>

            {placed ? (
              <div className="banner banner--success fade-in">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span>{t.subjects.placedBanner}</span>
              </div>
            ) : null}

            {subjects.length === 0 ? (
              <div className="empty-state">
                <Image 
                  src="/empty-state.png" 
                  alt={t.common.noSubjects}
                  width={140} 
                  height={140} 
                  className="mx-auto mb-2 opacity-90"
                />
                <p>{t.common.noSubjects}</p>
              </div>
            ) : (
              <div className="subject-grid">
                {subjects.map((subject, index) => {
                  const IconComp = subjectLucideIcons[index % subjectLucideIcons.length];
                  const progress = Math.max(0, Math.min(100, subject.progress ?? 0));
                  return (
                    <FadeIn key={subject.id} delay={index * 70}>
                      <Link
                        href={`/subjects/${subject.id}/lessons`}
                        className="subject-card"
                        style={{ ["--subject-progress" as never]: `${progress}%` }}
                      >
                        <span className="subject-card__fill" aria-hidden="true" />
                        <span className="subject-card__icon" aria-hidden="true">
                          <IconComp className="w-6 h-6" />
                        </span>
                        <div className="subject-card__content">
                          <h2>{subject.name}</h2>
                          <p>{t.subjects.openLessons}</p>
                        </div>
                        <span className="subject-card__arrow" aria-hidden="true">
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </Link>
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </section>
        </PageTransition>
      )}
    </RequireAuth>
  );
}
