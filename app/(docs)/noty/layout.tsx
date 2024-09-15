import CarbonAds from "@/components/blocks/docs/carbon-ads";
import { Avatar } from "@/components/blocks/header";
import { ThemeToggle } from "@/components/blocks/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconBrandPatreonFilled, IconSlash } from "@tabler/icons-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

const sponsors = [
	{
		url: "https://www.correctcasinos.com/free-slots",
		imageSrc: "correct-casino-logo.svg",
		alt: "Best Free Slots",
	},
	{
		url: "https://www.gambledex.com/",
		imageSrc: "gambledex.png",
		alt: "Gambledex",
	},
	{
		url: "https://www.boostmmr.com",
		imageSrc: "boostmmr.jpg",
		alt: "",
	},
	// {
	//   url: "https://goread.io/buy-instagram-followers",
	//   imageSrc: "Favicongoread.png",
	//   alt: "Buy Instagram Followers",
	// },
	{
		url: "https://nettikasinot.org",
		imageSrc: "nettikasino.png",
		alt: "Nettikasinot",
	},

	{
		url: "https://casinoshunter.com/online-casinos/real-money",
		imageSrc: "casinoshunter-dark.png",
		alt: "Casinos Hunter",
	},
	// {
	//   url: "https://reddogcasino.com/en/games/blackjack",
	//   imageSrc: "Red-Dog-Casino-Logo.png",
	//   alt: "RedDogCasino",
	// },
	{
		url: "https://slotsempire.com",
		imageSrc: "slots-empire.svg",
		alt: "Online Slots Empire Casino",
	},
	{
		url: "https://idealecasinos.nl",
		imageSrc: "ideal_casinos_logo_140_140.svg",
		alt: "online casinos met ideal",
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
						<Avatar />
						<IconSlash />
						<span className="font-semibold font-mono">noty</span>
					</div>
					<div className="flex items-center gap-x-8">
						<ThemeToggle hideIndicator />
					</div>
				</div>
			</header>

			<div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
				<aside className="sticky top-8 hidden w-44 shrink-0 lg:block">
					<nav>
						<div className="flex flex-col gap-2 *:font-medium *:text-muted-foreground text-sm">
							<Link href="/noty">About</Link>
							<Link href="/noty/installation">Installation</Link>
							<Link href="/noty/options">Options</Link>
							<Link href="/noty/types-and-layouts">Types & Layouts</Link>
							<Link href="/noty/themes">Themes</Link>
							<Link href="/noty/animations">Animations</Link>
							<Link href="/noty/web-push-notifications">
								Web Push Notifications
							</Link>
							<Link href="/noty/confirm-dialogs">Confirm Dialogs</Link>
							<Link href="/noty/api-and-callbacks">API & Callbacks</Link>
						</div>
					</nav>
				</aside>

				<main className="flex-1 pro">{children}</main>

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

						<ul className="divide-y mt-4 divide-border rounded-md border bg-zinc-100/75 dark:bg-zinc-900/75">
							{sponsors.map((product, index) => (
								<li
									key={index}
									className="flex items-center justify-center w-full py-2 pl-4 pr-5 text-sm leading-6 group relative "
								>
									<div className="filter grayscale hover:grayscale-0 transition-all dark:invert dark:hover:invert-0 duration-300 ease-in-out">
										<Link href={product.url} target="_blank">
											<Image
												src={`/sponsors/${product.imageSrc}`}
												alt={product.alt}
												width={140}
												height={140}
												className="max-w-64 min-h-6 transition-all duration-300 ease-in-out"
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
