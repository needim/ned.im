import type { Metadata } from "next";

import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { HeaderGradient } from "@/components/blocks/header-gradient";

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

export default function WebsiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<HeaderGradient />
			<div className="relative flex w-full flex-col">
				<Header />
				<main className="flex-auto">{children}</main>
				<Footer />
			</div>
			<div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full" />
		</>
	);
}
