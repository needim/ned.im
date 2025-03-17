import { Footer } from "@/components/blocks/footer";
import { SiteHeader } from "@/components/blocks/header";
// import { Header } from "@/components/blocks/header";
// import { HeaderGradient } from "@/components/blocks/header-gradient";

export default function WebsiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{/* <HeaderGradient /> */}
			<SiteHeader />
			<main className="flex-auto border-x border-border/50 max-w-3xl mx-auto">
				{children}
			</main>
			<Footer />
			<div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full" />
		</>
	);
}
