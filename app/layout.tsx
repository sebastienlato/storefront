import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getStore } from "@/lib/store/getStore";
import "./globals.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const { config, content } = await getStore();

  return {
    title: config.brand.name,
    description: config.brand.description ?? content.home.seo.description,
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { config } = await getStore();
  const theme = config.theme;
  const themeStyles = {
    "--color-bg": theme.colors.background,
    "--color-fg": theme.colors.foreground,
    "--color-muted": theme.colors.muted,
    "--color-accent": theme.colors.accent,
    "--color-accent-muted": theme.colors.accentMuted,
    "--color-border": theme.colors.border,
    "--color-surface": theme.colors.surface,
    "--font-display": theme.typography.display,
    "--font-body": theme.typography.body,
    "--radius-sm": theme.radii.sm,
    "--radius-md": theme.radii.md,
    "--radius-lg": theme.radii.lg,
    "--radius-pill": theme.radii.pill,
    "--spacing-section-y": theme.spacing.sectionY,
    "--spacing-container-x": theme.spacing.containerX,
    "--shadow-sm": theme.shadows.sm,
    "--shadow-md": theme.shadows.md,
    "--shadow-lg": theme.shadows.lg,
  } as CSSProperties;

  return (
    <html lang="en" data-store={config.id} style={themeStyles}>
      <body className="bg-[var(--color-bg)] text-[var(--color-fg)] antialiased">
        <Header store={config} />
        <main>{children}</main>
        <Footer store={config} />
      </body>
    </html>
  );
}
