import { Footer } from "@/components/blocks/footer";
import { SiteHeader } from "@/components/blocks/header";

export default function WebsiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SiteHeader />
			<main className="flex-auto border-x border-border/50 max-w-3xl mx-auto">
				{children}
			</main>
			<Footer />
			<div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 mask-[linear-gradient(transparent,#000000)] w-full" />
		</>
	);
}
