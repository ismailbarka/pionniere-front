import type { Metadata } from "next";
import { Amiri, Cairo } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const sans = Cairo({
  variable: "--font-sans",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
});

const display = Amiri({
  variable: "--font-display",
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Daam | Soutien scolaire & Réussite au primaire au Maroc",
  description:
    "Plateforme éducative d'apprentissage et de soutien scolaire pour l'école primaire au Maroc. Leçons vidéo conformes au programme officiel, quiz interactifs et suivi de progression.",
  keywords: [
    "soutien scolaire Maroc",
    "primaire Maroc",
    "leçons primaire",
    "quiz éducatifs",
    "Daam éducation",
    "cours en ligne primaire",
  ],
  openGraph: {
    title: "Daam | Soutien scolaire & Réussite au primaire",
    description:
      "Leçons vidéo conformes au programme marocain, quiz d'entraînement interactifs et suivi de progression pour l'école primaire.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning className={`${sans.variable} ${display.variable} h-full`}>
      <body className="min-h-full antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
