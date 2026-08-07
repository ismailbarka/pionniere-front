"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  UserPlus, 
  LogIn, 
  CheckCircle2, 
  Target, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Play,
  Star
} from "lucide-react";

// Wraps any section in a fade/rise-in-on-scroll animation.
function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

const featureIcons = [Target, GraduationCap, Award];

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main className="landing">
      <div className="landing__glow landing__glow--one" aria-hidden="true" />
      <div className="landing__glow landing__glow--two" aria-hidden="true" />
      <div className="landing__glow landing__glow--three" aria-hidden="true" />

      <section className="landing__content page-enter">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <Sparkles className="w-3.5 h-3.5" />
              {t.home.eyebrow}
            </p>
            <h1>{t.home.title}</h1>
            <p className="landing__lead">{t.home.lead}tetet</p>

            <div className="landing__actions">
              <Link href="/signup" className="btn btn--primary btn--lg">
                <UserPlus className="w-5 h-5" />
                {t.home.createAccount}
              </Link>
              <Link href="/login" className="btn btn--secondary btn--lg">
                <LogIn className="w-5 h-5" />
                {t.home.signIn}
              </Link>
              <Link href="/subjects" className="btn btn--ghost btn--lg">
                {/* <BookOpen className="w-5 h-5" /> */}
                {t.home.browseSubjects}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="landing__highlights">
              {t.landing.highlightValues.map((value, index) => (
                <div className="highlight-chip" key={value}>
                  <div className="flex items-center gap-1.5 mb-1">
                    {index === 0 && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    {index === 1 && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                    {index === 2 && <Award className="w-4 h-4 text-blue-500" />}
                    <strong>{value}</strong>
                  </div>
                  <span>{t.landing.highlightLabels[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel">
            {/* Embedded 3D Illustration Graphic */}
            <div className="relative w-full aspect-square max-w-[360px] mx-auto mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-300">
              <Image
                src="/hero-illustration.png"
                alt="Illustration Daam Education"
                width={360}
                height={360}
                className="object-contain"
                priority
              />
            </div>

            <div className="hero-panel__top">
              <span className="hero-panel__badge">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {t.home.heroBadge}
              </span>
              <div className="hero-panel__score">
                <strong>98%</strong>
                <span className="muted">{t.home.heroScore}</span>
              </div>
            </div>

            <div className="hero-panel__timeline">
              {t.home.heroSteps.map((step, index) => (
                <div className={`timeline-step ${index === 0 ? "is-active" : ""}`} key={step}>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{step}</strong>
                    <p>{t.landing.steps[index]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Video / how-it-works section --- */}
        <Reveal as="section">
          <div className="section-block">
            <div className="video-section">
              <div className="video-section__copy">
                <p className="eyebrow">
                  <Play className="w-3.5 h-3.5" />
                  {t.home.videoEyebrow}
                </p>
                <h2>{t.home.videoTitle}</h2>
                <p>{t.home.videoLead}</p>
              </div>
              <div className="video-section__media">
                <div className="video-embed">
                  <iframe
                    src="https://www.youtube.com/embed/QlgUDKR0_18"
                    title={t.home.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section">
          <div className="section-block">
            <div className="section-heading">
              <p className="eyebrow">
                <GraduationCap className="w-3.5 h-3.5" />
                {t.home.builtFor}
              </p>
              <h2>{t.home.builtTitle}</h2>
            </div>

            <div className="landing__cards">
              {t.home.builtCards.map((copy, index) => {
                const IconComponent = featureIcons[index % featureIcons.length];
                return (
                  <div className="landing__card p-4" key={copy}>
                    <Reveal delay={index * 90}>
                      <article className="feature-card">
                        <div className="flex justify-between items-center mb-3">
                          <span className="feature-card__index">0{index + 1}</span>
                          <IconComponent className="w-6 h-6 text-blue-600 opacity-80" />
                        </div>
                        <h2>{t.home.heroSteps[index]}</h2>
                        <p>{copy}</p>
                      </article>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal as="section">
          <div className="section-block section-block--split">
            <Reveal>
              <div className="quote-card">
                <p className="eyebrow">{t.home.teacherEyebrow}</p>
                <h2>{t.home.teacherTitle}</h2>
                <p>{t.home.teacherCopy}</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="note-card">
                <p className="eyebrow">{t.home.whatFeelsBetter}</p>
                <ul>
                  {t.home.betterItems.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Reveal>

        <footer
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
          }}
        >
          <p>
            © {new Date().getFullYear()} {t.common.copyright}. {t.common.allRightsReserved}.
          </p>
        </footer>
      </section>
    </main>
  );
}

