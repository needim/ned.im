import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Lexend } from "next/font/google";
import { headers } from 'next/headers';

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeScript } from "@/components/providers/theme-script";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserInteractionProvider } from "@/components/providers/user-interaction";
import Script from "next/script";
import "./globals.css";
import { MusicPlayer } from "@/components/blocks/music-player";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';

const LexendFont = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laogou717.com"),
  title: {
    default: "老狗",
    template: "%s - 老狗",
  },
  description: "老狗的个人网站",
  openGraph: {
    title: "老狗",
    description: "老狗的个人网站",
    url: "https://www.laogou717.com",
    siteName: "老狗",
    locale: "zh_CN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "老狗",
    card: "summary_large_image",
  },
  verification: {
    google: "google-site-verification",
    yandex: "yandex-verification",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 从 headers 中获取国家信息
  const headersList = await headers();
  const country = headersList.get('x-user-country') || '';
  console.log('Layout: Country from headers:', country);

  return (
    <html
      lang="zh-CN"
      className={`${GeistSans.variable} ${GeistMono.variable} ${LexendFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <meta name="user-country" content={country} />
        <link
          rel="preload"
          href="/_next/static/media/66f30814ff6d7cdf.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/84455f2b5a591033-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/e11418ac562b8ac1-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/sounds/pop.mp3"
          as="audio"
          type="audio/mpeg"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <UserInteractionProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <MusicPlayer />
          </TooltipProvider>
          <Toaster 
            position="top-left"
            toastOptions={{
              style: {
                background: 'var(--background)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              },
              className: 'font-sans',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
