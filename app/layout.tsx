import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeScript } from "@/components/providers/theme-script";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import "./globals.css";
import { MusicPlayer } from "@/components/blocks/music-player";

const LexendFont = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laogou717.com"),
  title: {
    default: "Jonas (老狗)",
    template: "Jonas (老狗) | %s",
  },
  description: "AI enthusiast, video editor, and photographer. Breaking down information barriers in AI technology.",
  openGraph: {
    title: "Jonas (老狗)",
    description: "AI enthusiast, video editor, and photographer. Breaking down information barriers in AI technology.",
    url: "https://www.laogou717.com",
    siteName: "Jonas (老狗)",
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
    title: "Jonas (老狗)",
    card: "summary_large_image",
  },
  verification: {
    // google: '',
    // yandex: '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${LexendFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="ned.im.theme"
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
        <Script
          data-domain="ned.im"
          src="https://stats.ned.im/js/script.pageview-props.tagged-events.js"
        />
      </body>
    </html>
  );
}
