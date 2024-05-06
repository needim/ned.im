import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";

import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { HeaderGradient } from "@/components/blocks/header-gradient";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "../globals.css";

const CrimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ned.im"),
  title: {
    default: "Nedim Arabacı",
    template: "%s | Nedim Arabacı",
  },
  description: "Developer, software manager, and creator.",
  openGraph: {
    title: "Nedim Arabacı",
    description: "Developer, software manager, and creator.",
    url: "https://ned.im",
    siteName: "Nedim Arabacı",
    locale: "en_US",
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
    title: "Nedim Arabacı",
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${CrimsonPro.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="ned.im.theme"
        >
          <TooltipProvider
            delayDuration={10}
            skipDelayDuration={10}
            disableHoverableContent
          >
            <HeaderGradient />
            <div className="flex w-full">
              <div className="fixed inset-0 flex justify-center sm:px-8">
                <div className="flex w-full max-w-4xl lg:px-8">
                  {/* <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" /> */}
                </div>
              </div>
              <div className="relative flex w-full flex-col">
                <Header />
                <main className="flex-auto">{children}</main>
                <Footer />
              </div>
            </div>
            <div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full "></div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
