import { AppStoreLogo } from "@/components/app-store-logo";
import GiderimLogo from "@/components/blocks/giderim-logo";
import IconGithub from "@/components/icons/github";
import { IconSmashing } from "@/components/icons/smashing";
import { WagesoLogo } from "@/components/wageso-logo";
import type { SVGProps } from "react";

export type NavItem = {
	href: string;
	label: string;
};

export type CareerItem = {
	from: number;
	to: number | null;
	title: string;
	company: {
		name: string;
		url: string | null;
	};
	location: string;
	description?: string;
	subRoles?: CareerItem[];
};

export type ProjectLink = {
	href: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
};

export type Project = {
	name: string;
	githubSlug: string;
	released: string;
	description: string;
	logo: React.ReactNode;
	links: ProjectLink[];
	metrics: Array<{
		label: string;
		value: number;
	}>;
	featured: boolean;
	bottomText?: string;
	deprecated?: boolean;
};

export type RouteItem = NavItem;

export const websiteRoutes = [
	{ href: "/", label: "Readme" },
	{ href: "/projects", label: "Projects" },
	{ href: "/colophon", label: "Colophon" },
] satisfies RouteItem[];

export const mainNavItems = websiteRoutes.filter(
	(route) => route.href !== "/colophon",
);

export const notyRoutes = [
	{ href: "/noty", label: "About" },
	{ href: "/noty/installation", label: "Installation" },
	{ href: "/noty/options", label: "Options" },
	{ href: "/noty/types-and-layouts", label: "Types & Layouts" },
	{ href: "/noty/themes", label: "Themes" },
	{ href: "/noty/animations", label: "Animations" },
	{ href: "/noty/web-push-notifications", label: "Web Push Notifications" },
	{ href: "/noty/confirm-dialogs", label: "Confirm Dialogs" },
	{ href: "/noty/api-and-callbacks", label: "API & Callbacks" },
] satisfies RouteItem[];

export const sitemapRoutes = [
	...websiteRoutes.map((route) => route.href),
	...notyRoutes.map((route) => route.href),
];

export const careerItems = [
	{
		from: 2021,
		to: null,
		title: "Software Engineer",
		company: { name: "Defter", url: "https://birdefter.com" },
		location: "Istanbul, Turkey",
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
] satisfies CareerItem[];

const ExternalLinkIcon = (props: SVGProps<SVGSVGElement>) => (
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
		{...props}
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
				icon: ExternalLinkIcon,
			},
			{
				label: "App Store",
				icon: AppStoreLogo,
				href: "https://apps.apple.com/app/wageso/id6747617318",
			},
		],
		metrics: [],
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
				icon: ExternalLinkIcon,
			},
			{
				href: "https://github.com/needim/gider.im-pwa",
				label: "GitHub",
				icon: IconGithub,
			},
		],
		metrics: [],
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
				icon: ExternalLinkIcon,
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
		logo: null,
		deprecated: true,
		description: "You're currently browsing this website.",
		links: [{ href: "/", label: "Website", icon: ExternalLinkIcon }],
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
			{ href: "/noty", label: "Website", icon: ExternalLinkIcon },
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
		logo: null,
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
] satisfies Project[];
