"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/i18n";
import { API_URL } from "@/lib/api";
import { getErrorMessage } from "@/lib/api";
import type { Subject } from "@/lib/types";
import { InlineLoader } from "@/components/layout/LoadingOverlay";
import { PageTransition } from "@/components/layout/PageTransition";
import { 
  Plus, 
  Trash2, 
  RotateCw, 
  Filter, 
  BookOpen, 
} from "lucide-react";

export default function AdminSubjectsPage() {
  const { authHeaders, isBusy, setStatus, setMessage } = useAuth();
  const { t } = useLocale();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [schoolLevel, setSchoolLevel] = useState<number>(1);
  const [filterLevel, setFilterLevel] = useState<number | "ALL">("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const loadSubjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = filterLevel === "ALL" ? `${API_URL}/subjects` : `${API_URL}/subjects?schoolLevel=${filterLevel}`;
      const response = await fetch(url, {
        headers: authHeaders,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || "Request failed");
      setSubjects(data as Subject[]);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [authHeaders, filterLevel, setMessage]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSubjects();
  }, [loadSubjects]);

  async function createSubject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/subjects`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ name: subjectName, schoolLevel }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || "Request failed");
      setSubjectName("");
      await loadSubjects();
      setMessage(t.admin.subjectCreated);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setStatus("idle");
    }
  }

  async function deleteSubject(subjectId: number) {
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/subjects/${subjectId}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.message || "Request failed");
      await loadSubjects();
      setMessage(t.admin.subjectDeleted);
    } catch (error) {
      setMessage(getErrorMessage(error));
    } finally {
      setStatus("idle");
    }
  }

  return (
    <PageTransition>
      <div className="admin-grid">
        <form className="card admin-form" onSubmit={createSubject}>
          <div className="flex items-center gap-2 mb-2">
            <Plus className="w-5 h-5 text-blue-600" />
            <h2>{t.admin.createSubject}</h2>
          </div>
          <label className="field">
            <span>{t.admin.subjectName}</span>
            <input 
              value={subjectName} 
              onChange={(event) => setSubjectName(event.target.value)} 
              placeholder={t.admin.subjectNamePlaceholder} 
              required 
            />
          </label>
          <label className="field">
            <span>{t.admin.schoolLevel}</span>
            <select
              value={schoolLevel}
              onChange={(e) => setSchoolLevel(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-main)',
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <option value={level} key={level}>
                  {t.levels[level]}
                </option>
              ))}
            </select>
          </label>
          <button className="btn btn--primary" disabled={isBusy} type="submit" style={{ marginTop: '12px' }}>
            {isBusy ? (
              <InlineLoader label={t.common.saving} />
            ) : (
              <>
                <Plus className="w-4 h-4" />
                {t.admin.addSubject}
              </>
            )}
          </button>
        </form>

        <div className="card">
          <div className="card__head" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2>{t.admin.subjects}</h2>
              </div>
              <button className="btn btn--ghost" disabled={isBusy} onClick={() => loadSubjects()} type="button">
                <RotateCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                {t.admin.refresh}
              </button>
            </div>
            
            {/* Level Filter Bar */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Filter className="w-4 h-4 text-slate-400 mr-1" />
              <button
                type="button"
                className={`btn btn--sm ${filterLevel === "ALL" ? "btn--primary" : "btn--ghost"}`}
                onClick={() => setFilterLevel("ALL")}
              >
                {t.admin.allLevels}
              </button>
              {[1, 2, 3, 4, 5, 6].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  className={`btn btn--sm ${filterLevel === lvl ? "btn--primary" : "btn--ghost"}`}
                  onClick={() => setFilterLevel(lvl)}
                >
                  {t.admin.levelFilter(lvl)}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <p className="muted">{t.admin.loading}</p>
          ) : subjects.length === 0 ? (
            <p className="muted">{t.common.noSubjects}</p>
          ) : (
            <div className="admin-list" style={{ marginTop: '16px' }}>
              {subjects.map((subject) => (
                <div className="admin-row" key={subject.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <strong>{subject.name}</strong>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: 'var(--primary)',
                        fontWeight: '600',
                      }}
                    >
                      {t.common.levelBadge(subject.schoolLevel || 1)}
                    </span>
                  </div>
                  <button className="btn btn--danger" onClick={() => deleteSubject(subject.id)} type="button">
                    <Trash2 className="w-4 h-4" />
                    {t.admin.delete}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
