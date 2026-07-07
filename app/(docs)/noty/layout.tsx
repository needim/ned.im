import CarbonAds from "@/components/blocks/docs/carbon-ads";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconBrandPatreonFilled } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NotyNav } from "./noty-nav";

export const metadata: Metadata = {
	title: "Noty",
};

const sponsors = [
	{
		url: "https://www.correctcasinos.com/free-slots",
		imageSrc: "correct-casino-logo.svg",
		darkImageSrc: "correct-casino-logo-dark.svg",
		alt: "Best Free Slots",
	},
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-full flex-col">
			<header className="shrink-0 border-b bg-white dark:bg-zinc-900">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<div className="flex items-center">
						<Link
							href="/"
							aria-label="Home"
							className="rounded px-1 py-1 font-mono text-sm/6 font-semibold tracking-normal text-muted-foreground transition hover:text-foreground"
						>
							ned.im
						</Link>
						<span
							aria-hidden="true"
							className="mx-1.5 text-muted-foreground/50"
						>
							/
						</span>
						<span className="font-mono text-sm/6 font-semibold tracking-normal">
							noty
						</span>
					</div>
					<div className="flex items-center gap-x-8">
						<ThemeToggle hideIndicator />
					</div>
				</div>
			</header>

			<div className="mx-auto flex flex-col lg:flex-row w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
				<aside className="lg:sticky top-8 mb-8 lg:mb-0 w-full lg:w-44 shrink-0 lg:block">
					<NotyNav />
				</aside>

				<main className="flex-1 grow max-w-full pro">{children}</main>

				<aside className="sticky top-8 hidden w-60 shrink-0 xl:block">
					<h2 className="text-xl font-semibold mb-2">Sponsorship</h2>
					<p className="text-balance">
						If you enjoy my work and want to support me creating stuff, I&apos;m
						on Patreon!
						<br />
						<Link
							href="https://patreon.com/needim"
							className={cn(buttonVariants(), "inline-block mt-2")}
						>
							<IconBrandPatreonFilled className="inline-block text-sm mr-2 -ml-1" />{" "}
							Become a Patron
						</Link>
					</p>

					<CarbonAds className="mt-4" />

					<div>
						<h2 className="text-xl font-semibold mt-2 mb-2">Sponsors</h2>

						<ul className="divide-y mt-4 divide-border border bg-zinc-100/75 dark:bg-zinc-900/75">
							{sponsors.map((product, index) => (
								<li
									key={index}
									className="flex items-center justify-center w-full py-2 pl-4 pr-5 text-sm leading-6 group relative "
								>
									<div className="opacity-75 transition-opacity duration-300 ease-in-out hover:opacity-100">
										<Link href={product.url} target="_blank">
											<Image
												src={`/sponsors/${product.imageSrc}`}
												alt={product.alt}
												width={140}
												height={140}
												className="h-auto max-w-64 transition-all duration-300 ease-in-out dark:hidden"
												style={{ width: "auto", height: "auto" }}
											/>
											<Image
												src={`/sponsors/${product.darkImageSrc}`}
												alt={product.alt}
												width={140}
												height={140}
												className="hidden h-auto max-w-64 transition-all duration-300 ease-in-out dark:block"
												style={{ width: "auto", height: "auto" }}
											/>
										</Link>
									</div>
								</li>
							))}
						</ul>
					</div>
				</aside>
			</div>
		</div>
	);
}
