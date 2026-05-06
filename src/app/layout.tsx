import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { DocsShell } from "@/components/layout/DocsShell";

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

const BASE_URL = "https://jsrothwell.github.io/Sitka";
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

// Blocking script: runs before hydration to apply tokens directly on the root
// element. Uses style.setProperty so the browser picks them up immediately —
// no cascade dependency, no flash of wrong theme.
const themeScript = `
  try {
    var t = localStorage.getItem('sitka-theme');
    var dark = t === 'dark' || ((!t || t === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var r = document.documentElement;
    if (dark) {
      r.classList.add('dark');
      r.style.colorScheme = 'dark';
      r.style.setProperty('--background',      '9 9 12');
      r.style.setProperty('--surface',         '13 13 17');
      r.style.setProperty('--surface-raised',  '22 22 28');
      r.style.setProperty('--surface-hover',   '32 32 40');
      r.style.setProperty('--border',          '38 38 48');
      r.style.setProperty('--border-subtle',   '26 26 33');
      r.style.setProperty('--text-primary',    '242 242 246');
      r.style.setProperty('--text-secondary',  '155 155 170');
      r.style.setProperty('--text-tertiary',   '100 100 115');
      r.style.setProperty('--accent-subtle',   '10 38 21');
      r.style.setProperty('--accent-muted',    '20 72 39');
      r.style.setProperty('--nav-active-color','rgb(52, 168, 101)');
      r.style.setProperty('--card-tint-bg',    'rgb(12, 28, 18)');
    } else {
      r.style.colorScheme = 'light';
      r.style.setProperty('--background',      '252 252 253');
      r.style.setProperty('--surface',         '255 255 255');
      r.style.setProperty('--surface-raised',  '246 246 248');
      r.style.setProperty('--surface-hover',   '240 240 244');
      r.style.setProperty('--border',          '224 224 231');
      r.style.setProperty('--border-subtle',   '240 240 244');
      r.style.setProperty('--text-primary',    '15 15 18');
      r.style.setProperty('--text-secondary',  '85 85 99');
      r.style.setProperty('--text-tertiary',   '130 130 147');
      r.style.setProperty('--accent-subtle',   '232 248 239');
      r.style.setProperty('--accent-muted',    '166 220 190');
      r.style.setProperty('--nav-active-color','rgb(33, 150, 83)');
      r.style.setProperty('--card-tint-bg',    'rgba(11, 55, 30, 0.06)');
    }
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
