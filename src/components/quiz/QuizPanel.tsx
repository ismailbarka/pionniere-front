"use client";

import type { QuizQuestion, QuizResult } from "@/lib/types";
import { InlineLoader } from "@/components/layout/LoadingOverlay";
import { useLocale } from "@/lib/i18n";
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Send, 
  Check 
} from "lucide-react";

type QuizPanelProps = {
  questions: QuizQuestion[];
  answers: Record<number, string>;
  onAnswer: (questionId: number, answer: string) => void;
  onSubmit: () => void;
  isBusy: boolean;
  result?: QuizResult;
  disabled?: boolean;
};

export function QuizPanel({
  questions,
  answers,
  onAnswer,
  onSubmit,
  isBusy,
  result,
  disabled = false,
}: QuizPanelProps) {
  const { t } = useLocale();

  if (questions.length === 0) {
    return <p className="muted">{t.quiz.noQuestions}</p>;
  }

  const answeredCount = questions.filter((question) => answers[question.id]).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="quiz-panel">
      <div className="quiz-panel__head">
        <div>
          <p className="eyebrow">
            <HelpCircle className="w-3.5 h-3.5" />
            {t.quiz.title}
          </p>
          <h4>{t.quiz.title}</h4>
          <p className="quiz-panel__copy">
            {t.quiz.lead}
          </p>
        </div>
        <div className="quiz-progress" aria-label={t.quiz.progressText(answeredCount, questions.length, progress)}>
          <div className="quiz-progress__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <small>
            {t.quiz.progressText(answeredCount, questions.length, progress)}
          </small>
        </div>
      </div>

      <div className="quiz-questions">
        {questions.map((question, index) => (
          <article className="quiz-question" key={question.id}>
            <div className="quiz-question__index">{index + 1}</div>
            <div className="quiz-question__content">
              <p>{question.question}</p>
              <div className="quiz-options">
                {(
                  [
                    ["A", question.optionA],
                    ["B", question.optionB],
                    ["C", question.optionC],
                    ["D", question.optionD],
                  ] as const
                ).map(([key, label]) => {
                  const selected = answers[question.id] === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`quiz-option ${selected ? "is-selected" : ""}`}
                      disabled={disabled || isBusy}
                      aria-pressed={selected}
                      onClick={() => onAnswer(question.id, key)}
                    >
                      <span className="quiz-option__key">{key}</span>
                      <span className="quiz-option__label">{label}</span>
                      <span className="quiz-option__check" aria-hidden="true">
                        {selected && <Check className="w-3 h-3 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="quiz-panel__footer">
        <button className="btn btn--primary" disabled={disabled || isBusy} onClick={onSubmit} type="button">
          {isBusy ? (
            <InlineLoader label={t.quiz.submitting} />
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t.quiz.submit}
            </>
          )}
        </button>

        {result ? (
          <div className={`quiz-result ${result.passed ? "quiz-result--pass" : "quiz-result--fail"}`}>
            <div className="flex items-center gap-2">
              {result.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              )}
              <strong>{result.passed ? t.quiz.passedBadge : t.quiz.failedBadge}</strong>
            </div>
            <span>
              {t.quiz.scoreSummary(result.score, result.correct, result.total)}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
