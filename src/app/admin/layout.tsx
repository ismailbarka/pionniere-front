"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useLocale } from "@/lib/i18n";
import { ShieldCheck, BookOpen, Layers, Target } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useLocale();

  const tabs = [
    { href: "/admin/subjects", label: t.admin.subjects, icon: BookOpen },
    { href: "/admin/lessons", label: t.admin.lessons, icon: Layers },
    { href: "/admin/placement", label: t.admin.placement, icon: Target },
  ];

  return (
    <RequireAuth role="ADMIN">
      <section className="page-shell">
        <header className="page-header">
          <div>
            <p className="eyebrow">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.admin.title}
            </p>
            <h1>{t.admin.title}</h1>
            <p className="page-header__lead">{t.admin.lead}</p>
          </div>
        </header>

        <nav className="admin-nav" aria-label={t.admin.title}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`admin-nav__link ${pathname === tab.href ? "is-active" : ""}`}
              >
                <Icon className="w-4 h-4 mr-1.5 inline" />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {children}
      </section>
    </RequireAuth>
  );
}
