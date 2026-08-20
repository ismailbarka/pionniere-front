"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useLocale, type Locale } from "@/lib/i18n";
import { useState, useEffect, useRef } from "react";
import { Settings, LogOut } from "lucide-react";

const studentLinks: Array<{ href: string; key: "subjects" | "placement" }> = [];

const adminLinks = [
  { href: "/admin/subjects", key: "adminSubjects" as const },
  { href: "/admin/lessons", key: "adminLessons" as const },
];

function LocaleButton({
  active,
  locale,
  onClick,
}: {
  active: boolean;
  locale: Locale;
  onClick: () => void;
}) {
  return (
    <button type="button" className={`locale-switcher__button ${active ? "is-active" : ""}`} onClick={onClick}>
      {locale.toUpperCase()}
    </button>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { locale, setLocale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close drawer and dropdown when route changes
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/signup";
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const links = user?.role === "ADMIN" ? adminLinks : studentLinks;
  const brandHref = user ? (user.role === "ADMIN" ? "/admin/subjects" : "/subjects") : "/";

  const displayName = user?.username || user?.email || "";
  const avatarLetter = displayName.slice(0, 1).toUpperCase();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href={brandHref} className="brand">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L3 8.5V16.5L12 22L21 16.5V8.5L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M12 11V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M9.5 13.5H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand__text">
            <strong>{t.brand}</strong>
          </span>
        </Link>

        {user && !isAuthPage ? (
          <nav className="site-nav" aria-label="Main">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`site-nav__link ${pathname.startsWith(link.href) ? "is-active" : ""}`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>
        ) : isPublicPage ? (
          <nav className="site-nav site-nav--public" aria-label="Public" />
        ) : null}

        <div className="site-header__actions">
          <div className="locale-switcher" aria-label={t.switchLabel}>
            <LocaleButton active={locale === "fr"} locale="fr" onClick={() => setLocale("fr")} />
            <LocaleButton active={locale === "ar"} locale="ar" onClick={() => setLocale("ar")} />
          </div>

          {user ? (
            <div className="user-menu" ref={profileRef}>
              {/* Avatar circle button */}
              <button
                type="button"
                className="user-avatar-btn"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                aria-label={t.nav.userMenu}
              >
                <span className="user-avatar">{avatarLetter}</span>
              </button>

              {/* Dropdown panel */}
              {profileOpen && (
                <div className="user-dropdown">
                  {/* Header: big avatar + name */}
                  <div className="user-dropdown__header">
                    <span className="user-avatar user-avatar--lg">{avatarLetter}</span>
                    <div>
                      <p className="user-dropdown__name">{displayName}</p>
                      <p className="user-dropdown__role">
                        {user.role === "ADMIN" ? t.role.admin : t.role.student}
                      </p>
                    </div>
                  </div>

                  <div className="user-dropdown__divider" />

                  {/* Settings */}
                  <Link
                    href="/settings"
                    className="user-dropdown__item"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>{t.nav.settings}</span>
                  </Link>

                  <div className="user-dropdown__divider" />

                  {/* Logout */}
                  <button
                    type="button"
                    className="user-dropdown__item user-dropdown__item--danger"
                    onClick={() => { setProfileOpen(false); logout(); }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.nav.signOut}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="site-header__auth-group">
              {isAuthPage ? (
                <Link
                  href={pathname === "/login" ? "/signup" : "/login"}
                  className="btn btn--primary"
                >
                  {pathname === "/login" ? t.nav.getStarted : t.nav.signIn}
                </Link>
              ) : (
                <>
                  <Link href="/login" className="btn btn--ghost">
                    {t.nav.signIn}
                  </Link>
                  <Link href="/signup" className="btn btn--primary">
                    {t.nav.getStarted}
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-active" : ""}`}
            aria-expanded={menuOpen}
            aria-label={t.nav.toggleMenu}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer & Backdrop */}
      {menuOpen && (
        <>
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-drawer">
            {user && !isAuthPage ? (
              <nav className="mobile-drawer__nav" aria-label="Mobile Main">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-drawer__link ${pathname.startsWith(link.href) ? "is-active" : ""}`}
                  >
                    {t.nav[link.key]}
                  </Link>
                ))}
              </nav>
            ) : isPublicPage ? (
              <nav className="mobile-drawer__nav" aria-label="Mobile Public">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className={`mobile-drawer__link ${pathname === "/" ? "is-active" : ""}`}
                >
                  {t.nav.home}
                </Link>
              </nav>
            ) : null}

            <div className="mobile-drawer__footer">
              <div className="locale-switcher locale-switcher--mobile" aria-label={t.switchLabel}>
                <LocaleButton active={locale === "fr"} locale="fr" onClick={() => setLocale("fr")} />
                <LocaleButton active={locale === "ar"} locale="ar" onClick={() => setLocale("ar")} />
              </div>

              {user ? (
                <div className="mobile-drawer__user">
                  <div className="mobile-drawer__user-card">
                    <span className="user-avatar">{avatarLetter}</span>
                    <div className="mobile-drawer__user-info">
                      <span className="mobile-drawer__user-name">{displayName}</span>
                      <span className="mobile-drawer__user-role">
                        {user.role === "ADMIN" ? t.role.admin : t.role.student}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/settings"
                    className="btn btn--ghost mobile-drawer__btn"
                    onClick={() => setMenuOpen(false)}
                    style={{ marginBottom: "8px" }}
                  >
                    <Settings className="w-4 h-4" />
                    <span>{t.nav.settings}</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn--ghost mobile-drawer__btn"
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.nav.signOut}</span>
                  </button>
                </div>
              ) : isAuthPage ? (
                <div className="mobile-drawer__auth">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn--ghost mobile-drawer__btn"
                  >
                    {t.nav.home}
                  </Link>
                  <Link
                    href={pathname === "/login" ? "/signup" : "/login"}
                    onClick={() => setMenuOpen(false)}
                    className="btn btn--primary mobile-drawer__btn"
                  >
                    {pathname === "/login" ? t.nav.getStarted : t.nav.signIn}
                  </Link>
                </div>
              ) : (
                <div className="mobile-drawer__auth">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn--ghost mobile-drawer__btn"
                  >
                    {t.nav.signIn}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn--primary mobile-drawer__btn"
                  >
                    {t.nav.getStarted}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
