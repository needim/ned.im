import { AppStoreLogo } from "@/components/app-store-logo";
import GiderimLogo from "@/components/blocks/giderim-logo";
import IconGithub from "@/components/icons/github";
import { IconSmashing } from "@/components/icons/smashing";
import { WagesoLogo } from "@/components/wageso-logo";
import { type ClassValue, clsx } from "clsx";
import type { SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formattedDate = (date: string) =>
	new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
	});
export const navItems = [
	{ href: "/", label: "Readme" },
	// { href: "/notes", label: "Notes" }, // disabled for now
	{ href: "/projects", label: "Projects" },
];

export const careerItems = [
	{
		from: 2021,
		to: null,
		title: "Software Engineer",
		company: { name: "Defter", url: "https://birdefter.com" },
		location: "Istanbul, Turkey",
		// description: "I am currently working at my job.",
		subRoles: [
			{
				from: 2019,
				to: 2021,
				title: "Full Stack Developer",
				company: { name: "Defter", url: "https://birdefter.com" },
				location: "Podgorica, Montenegro",
				description:
					"I was responsible for the development of the company's CRM/ERP products.",
			},
		],
	},
	{
		from: 2018,
		to: 2018,
		title: "Full Stack Developer",
		company: { name: "90Pixel", url: "https://90pixel.com" },
		location: "Izmir, Turkey",
		description:
			"I worked as a Full Stack Developer at 90Pixel for two months, after which I accepted an offer from Defter and relocated to Montenegro.",
	},
	{
		from: 2017,
		to: 2018,
		title: "Full Stack Developer",
		company: { name: "Freelancer", url: null },
		location: "Izmir, Turkey",
		description:
			"I took a gap year to pursue my passion for freelance work. This experience allowed me to gain invaluable skills and provided the opportunity to work with a diverse range of clients.",
	},
	{
		from: 2015,
		to: 2017,
		title: "Co Founder",
		company: { name: "whodidthis.io", url: null },
		location: "Izmir, Turkey",
		description:
			"I created usable web interfaces, front-end coding, and almost everything required to build a startup. After sharing this entrepreneurship passion for nearly 2 years, sadly my partners and I had to say goodbye to our lovely startup for now.",
	},
	{
		from: 2015,
		to: 2015,
		title: "Frontend Developer",
		company: { name: "Alegra Digital", url: null },
		location: "Istanbul, Turkey",
		description:
			"I have 10 months of hands-on experience as a front-end developer in Alegra Digital. I quit my job there to follow my dreams: whodidthis.io",
	},
	{
		from: 2012,
		to: 2015,
		title: "Full Stack Developer",
		company: { name: "Efabrika", url: "https://efabrika.com" },
		location: "Istanbul, Turkey",
		description:
			"I provided front end & back-end development for reputable clients such as Anadolu Agency, Turkish Airlines, etc. My responsibilities included UI, UX, and API development.",
	},
	{
		from: 2012,
		to: 2012,
		title: "Full Stack Developer",
		company: { name: "Atölye15", url: "https://atolye15.com" },
		location: "Izmir, Turkey",
		description:
			"After working as a full stack developer for an Izmir-based company; Atölye15, I accepted the great offer from Efabrika and moved to Istanbul.",
	},
	{
		from: 2010,
		to: 2012,
		title: "Full Stack Developer",
		company: { name: "LMS", url: null },
		location: "Izmir, Turkey",
		description:
			"I provided front end & back-end development for the company's Learning Management System for about 2 years.",
	},
];

const ExtLinkLogo = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="3"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="mr-1 inline-block"
	>
		<path d="M7 7h10v10" />
		<path d="M7 17 17 7" />
	</svg>
);

export const projects = [
	{
		name: "Wageso",
		githubSlug: "needim/wageso",
		released: "2025-11-20",
		description:
			"Private money tracker for income, expenses, assets, and net worth.",
		bottomText: "Now available on App Store",
		logo: <WagesoLogo className="size-10" />,
		links: [
			{
				href: "https://wageso.com",
				label: "Website",
				icon: ExtLinkLogo,
			},
			{
				label: "App Store",
				icon: AppStoreLogo,
				href: "https://apps.apple.com/app/wageso/id6747617318",
			},
		],
		metrics: [] as Array<{
			label: string;
			value: number;
		}>,
		featured: true,
	},
	{
		name: "gider.im",
		githubSlug: "needim/gider.im-pwa",
		released: "2024-05-26",
		description: "An earlier web app for private income and expense tracking.",
		logo: <GiderimLogo className="size-10" />,
		links: [
			{
				href: "https://gider.im",
				label: "Website",
				icon: ExtLinkLogo,
			},
			{
				href: "https://github.com/needim/gider.im-pwa",
				label: "GitHub",
				icon: IconGithub,
			},
		],
		metrics: [] as Array<{ label: string; value: number }>,
		featured: true,
	},
	{
		name: "smashing.tools",
		githubSlug: "smashing-tools/smashing.tools",
		released: "2023-12-25",
		logo: <IconSmashing className="size-10" />,
		description:
			"A directory of starter kits, UI libraries, and frontend resources.",
		links: [
			{
				href: "https://smashing.tools",
				label: "Website",
				icon: ExtLinkLogo,
			},
			{
				href: "https://github.com/smashing-team/smashing.tools",
				label: "GitHub",
				icon: IconGithub,
			},
		],
		featured: true,
		metrics: [],
	},
	{
		name: "ned.im",
		githubSlug: "needim/ned.im",
		released: "2023-01-01",
		logo: <></>,
		deprecated: true,
		description: "You're currently browsing this website.",
		links: [{ href: "/", label: "Website", icon: ExtLinkLogo }],
		featured: false,
		metrics: [],
	},
	{
		name: "noty",
		githubSlug: "needim/noty",
		released: "2023-01-01",
		logo: <IconGithub className="size-10" />,
		deprecated: true,
		description:
			"A dependency-free notification plugin for older JavaScript apps.",
		links: [
			{ href: "/noty", label: "Website", icon: ExtLinkLogo },
			{
				href: "https://github.com/needim/noty",
				label: "GitHub",
				icon: IconGithub,
			},
		],
		featured: true,
		metrics: [],
	},

	{
		name: "Kit 2.5D",
		githubSlug: "needim/Kit25D",
		released: "2017-11-16",
		logo: <></>,
		description:
			"Unity experiment for 2.5D worlds built from sprites and 2D colliders.",
		links: [
			{
				href: "https://github.com/needim/Kit25D",
				label: "GitHub",
				icon: IconGithub,
			},
		],
		featured: false,
		metrics: [],
	},
];
