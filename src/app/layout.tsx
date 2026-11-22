import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DocsShell } from "@/site/layout/DocsShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "http://localhost:3000";
const OG_DESCRIPTION =
  "A premium design system for building consistent, accessible digital products — design tokens, component documentation, and platform-specific guidance for Web, iOS, and macOS.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s — Sitka Design System",
    default: "Sitka Design System",
  },
  description: OG_DESCRIPTION,
  keywords: ["design system", "components", "tokens", "React", "SwiftUI"],
  openGraph: {
    title: "Sitka Design System",
    description: OG_DESCRIPTION,
    url: BASE_URL,
    siteName: "Sitka Design System",
    images: [
      {
        url: `${BASE_URL}/og-preview.png`,
        width: 1200,
        height: 630,
        alt: "Sitka Design System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sitka Design System",
    description: OG_DESCRIPTION,
    images: [`${BASE_URL}/og-preview.png`],
  },
};

// Blocking script: runs before hydration and sets data-theme on <html>, so the token
// values in globals.css (generated from tokens.json) apply with no flash of the wrong theme.
// Token values are never written inline: inline styles would override globals.css,
// including prefers-contrast and the light-theme status-text tones.
const themeScript = `
  try {
    var t = localStorage.getItem('sitka-theme');
    var dark = t === 'dark' || ((!t || t === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var r = document.documentElement;
    r.setAttribute('data-theme', dark ? 'dark' : 'light');
    r.classList.toggle('dark', dark);
    r.style.colorScheme = dark ? 'dark' : 'light';
  } catch(e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Blocking script prevents flash of wrong theme on initial load */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <DocsShell>{children}</DocsShell>
        </ThemeProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SC89RP965Q" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SC89RP965Q');
        `}</Script>
      </body>
    </html>
  );
}
