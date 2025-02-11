import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Lexend } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeScript } from "@/components/providers/theme-script";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import "./globals.css";
import { MusicPlayer } from "@/components/blocks/music-player";
import { cn } from "@/lib/utils";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${GeistSans.variable} ${GeistMono.variable} ${LexendFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
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
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider
            delayDuration={10}
            skipDelayDuration={10}
            disableHoverableContent
          >
            <div className="flex w-full h-full min-h-full">
              <div className="relative flex w-full h-full flex-col">
                {children}
                <MusicPlayer />
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
