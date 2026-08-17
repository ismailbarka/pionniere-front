"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/i18n";
import { API_URL, getErrorMessage } from "@/lib/api";
import type { Lesson, Subject } from "@/lib/types";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { LoadingOverlay } from "@/components/layout/LoadingOverlay";
import { FadeIn, PageTransition } from "@/components/layout/PageTransition";
import { 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  ArrowRight, 
  Sparkles, 
  ArrowLeft 
} from "lucide-react";

export default function SubjectLessonsIndexPage() {
  const params = useParams<{ subjectId: string }>();
  const subjectId = Number(params.subjectId);
  const { authHeaders, setMessage } = useAuth();
  const { t } = useLocale();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setMessage("");

      try {
        const [subjectsResponse, lessonsResponse] = await Promise.all([
          fetch(`${API_URL}/subjects`, { headers: authHeaders }),
          fetch(`${API_URL}/lessons?subjectId=${subjectId}`, {
            headers: authHeaders,
          }),
        ]);

        const subjectsData = await subjectsResponse.json().catch(() => null);
        const lessonsData = await lessonsResponse.json().catch(() => null);

        if (!subjectsResponse.ok) {
          const text = Array.isArray(subjectsData?.message)
            ? subjectsData.message.join(", ")
            : subjectsData?.message;
          throw new Error(text || "Request failed");
        }
        if (!lessonsResponse.ok) {
          const text = Array.isArray(lessonsData?.message)
            ? lessonsData.message.join(", ")
            : lessonsData?.message;
          throw new Error(text || "Request failed");
        }

        const matchedSubject = (subjectsData as Subject[]).find((item) => item.id === subjectId) || null;
        setSubject(matchedSubject);
        setLessons(lessonsData as Lesson[]);
      } catch (error) {
        setMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    if (subjectId) void load();
  }, [authHeaders, subjectId, setMessage]);

  const orderedLessons = [...lessons].sort((a, b) => a.order - b.order);
  const completedCount = orderedLessons.filter((lesson) => lesson.status === "completed").length;
  const nextLesson = orderedLessons.find((lesson) => lesson.status !== "completed") || orderedLessons[0];

  return (
    <RequireAuth role="STUDENT">
      {isLoading ? (
        <LoadingOverlay label={t.common.loadingLessons} />
      ) : (
        <PageTransition>
          <section className="page-shell">
            <div className="mb-4">
              <Link href="/subjects" className="btn btn--ghost text-sm py-1">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t.nav.subjects}
              </Link>
            </div>

            <header className="page-header">
              <div>
                <p className="eyebrow">
                  <BookOpen className="w-3.5 h-3.5" />
                  {subject?.name || t.nav.subjects}
                </p>
                <h1>{t.lessonIndex.title}</h1>
                <p className="page-header__lead">{t.lessonIndex.lead}</p>
              </div>
              <div className="lesson-path-stats">
                <div className="lesson-path-stat">
                  <strong>{completedCount}</strong>
                  <span>{t.common.completed}</span>
                </div>
                <div className="lesson-path-stat">
                  <strong>{orderedLessons.length}</strong>
                  <span>{t.common.totalLessons}</span>
                </div>
                {nextLesson ? (
                  <Link href={`/subjects/${subjectId}/lessons/${nextLesson.id}`} className="btn btn--primary">
                    <Sparkles className="w-4 h-4" />
                    {nextLesson.status === "completed" ? t.lessonIndex.reviewNextLabel : t.lessonIndex.continueLabel}
                  </Link>
                ) : null}
              </div>
            </header>

            {orderedLessons.length === 0 ? (
              <div className="empty-state">
                <Image 
                  src="/empty-state.png" 
                  alt={t.common.noLessons} 
                  width={140} 
                  height={140} 
                  className="mx-auto mb-2 opacity-90"
                />
                <p>{t.common.noLessons}</p>
              </div>
            ) : (
              <div className="lesson-list">
                {orderedLessons.map((lesson, index) => {
                  const isCompleted = lesson.status === "completed";
                  const isLocked = lesson.status === "locked";

                  return (
                    <FadeIn key={lesson.id} delay={index * 70}>
                      <Link
                        href={`/subjects/${subjectId}/lessons/${lesson.id}`}
                        className={`lesson-list-card lesson-list-card--${lesson.status}`}
                      >
                        <div className="lesson-list-card__meta">
                          <span className={`lesson-step lesson-step--small ${lesson.status}`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : isLocked ? (
                              <Lock className="w-4 h-4 text-slate-400" />
                            ) : (
                              lesson.order
                            )}
                          </span>
                          <div>
                            <p className="eyebrow">
                              {t.lessonIndex.lessonPrefix} {lesson.order}
                            </p>
                            <h2>{lesson.title}</h2>
                            <p>{lesson.description || t.lessonIndex.openLessonCopy}</p>
                          </div>
                        </div>
                        <div className="lesson-list-card__side">
                          <span className={`status-badge status-badge--${lesson.status}`}>
                            {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                            {isLocked && <Lock className="w-3.5 h-3.5 mr-1" />}
                            {!isCompleted && !isLocked && <PlayCircle className="w-3.5 h-3.5 mr-1" />}
                            {t.status[lesson.status]}
                          </span>
                          <span className="lesson-list-card__arrow" aria-hidden="true">
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        </div>
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
