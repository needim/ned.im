import GiderimLogo from "@/components/blocks/giderim-logo";
import { IconSmashing } from "@/components/icons/smashing";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formattedDate = (date: string) =>
	new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
	});
export const formattedDateTimeline = (
	date: string,
	formatOpts?: Intl.DateTimeFormatOptions | undefined,
) =>
	new Date(date).toLocaleDateString(
		"en-US",
		formatOpts
			? formatOpts
			: {
					year: "numeric",
				},
	);

export const navItems = [
	{ href: "/", label: "Readme" },
	{ href: "/changelog", label: "Changelog" },
	// { href: "/notes", label: "Notes" }, // disabled for now
	{ href: "/projects", label: "Projects" },
	{ href: "/stack", label: "Stack" },
];

export const careerItems = [
	{
		from: 2021,
		to: null,
		title: "Software Manager & Lead Developer",
		company: { name: "Defter", url: "https://birdefter.com" },
		location: "Istanbul, Turkey",
		description: null,
	},
	{
		from: 2019,
		to: 2021,
		title: "Full Stack Developer",
		company: { name: "Defter", url: "https://birdefter.com" },
		location: "Podgorica, Montenegro",
		description: null,
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
		location: "Turkey",
		description:
			"I took a gap year to pursue my passion for freelance work. This experience allowed me to gain invaluable skills and provided the opportunity to work with a diverse range of clients.",
	},
	{
		from: 2015,
		to: 2017,
		title: "Co Founder",
		company: { name: "whodidthis.io", url: null },
		location: "Turkey",
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

const dateFormat = {
	day: {
		year: "numeric" as const,
		month: "long" as const,
		day: "numeric" as const,
	},
	month: {
		year: "numeric" as const,
		month: "long" as const,
	},
	year: {
		year: "numeric" as const,
	},
};

const changelogItems: Array<{
	date: string;
	event: string;
	title: string;
	description?: string;
	icon?: string;
	dateFormatOptions?: (typeof dateFormat)[keyof typeof dateFormat];
	photos?: Array<{ src: string; variant: "1x1" | "4x3" | "4x5" }>;
}> = [
	{
		date: "2024-06-02",
		event: "100 upvotes",
		title: "on Peerlist",
		description: "gider.im is on the top of the list.",
		icon: "💯",
		dateFormatOptions: dateFormat.day,
		// photos: [
		//   {
		//     src: "/changelog/kavala  4x5.png",
		//     variant: "4x5",
		//   },
		// ],
	},
	{
		date: "2024-05-27",
		event: "Lauched gider.im",
		title: "Public beta",
		description: "gider.im is a personal finance tracker.",
		icon: "🚀",
		dateFormatOptions: dateFormat.day,
		// photos: [
		//   {
		//     src: "/changelog/kavala  4x5.png",
		//     variant: "4x5",
		//   },
		// ],
	},
	{
		date: "2024-07-02",
		event: "Visit to Spain",
		title: "Begur & Barcelona",
		icon: "🇪🇸",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/begur.png",
				variant: "4x5",
			},
			{
				src: "/changelog/begur-2.png",
				variant: "4x5",
			},
			{
				src: "/changelog/barcelona.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2024-07-01",
		event: "Visit to Portugal",
		title: "Madeira Island",
		icon: "🇵🇹",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/madeira.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-2.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-3.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-4.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-6.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-7.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-8.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-9.png",
				variant: "4x5",
			},
			{
				src: "/changelog/madeira-10.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2024-07-01",
		event: "Visit to Portugal",
		title: "Lisboa, Porto",
		icon: "🇵🇹",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/lisboa.png",
				variant: "4x5",
			},
			{
				src: "/changelog/lisboa-2.png",
				variant: "4x5",
			},
			{
				src: "/changelog/porto.png",
				variant: "4x5",
			},
			{
				src: "/changelog/porto-2.png",
				variant: "4x5",
			},
			{
				src: "/changelog/porto-3.png",
				variant: "4x5",
			},
			{
				src: "/changelog/porto-4.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2024-06-15",
		event: "Visit to Greece",
		title: "Thassos Island",
		icon: "🇬🇷",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/thassos.png",
				variant: "4x5",
			},
			{
				src: "/changelog/thassos-2.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2023-11-01",
		event: "Visit to Greece",
		title: "Kavala",
		icon: "🇬🇷",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/kavala  4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2023-08-01",
		event: "Visit to Greece",
		title: "Samos Island",
		icon: "🇬🇷",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/samos  4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/samos-3  4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2023-07-04",
		event: "Visit to France",
		title: "Colmar",
		icon: "🇫🇷",
		dateFormatOptions: dateFormat.month,
	},
	{
		date: "2023-07-04",
		event: "Visit to Switzerland",
		title: "Zurich, Bern, Schaffhausen",
		icon: "🇨🇭",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/scaffahaouseasesan  4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2023-04-21",
		event: "Visit to Greece",
		title: "Chios Island",
		description: "Big family trip.",
		icon: "🇬🇷",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/chios.png",
				variant: "1x1",
			},
			{
				src: "/changelog/chios-2.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2022-07-08",
		event: "Visit to Egypt",
		title: "Sharm El-Sheikh",
		description: "Food was terrible for me.",
		icon: "🇪🇬",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/egypt-1.png",
				variant: "1x1",
			},
			{
				src: "/changelog/egypt-2.png",
				variant: "1x1",
			},
			{
				src: "/changelog/egypt-3.png",
				variant: "1x1",
			},
			{
				src: "/changelog/egypt-4 4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2021-06-16",
		event: "Honeymoon",
		title: "Zanzibar",
		description: "We went to Zanzibar for our honeymoon.",
		icon: "🏝️",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/zanzibar-1.png",
				variant: "1x1",
			},
			{
				src: "/changelog/zanzibar-2  4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/zanzibar-3.png",
				variant: "1x1",
			},
			{
				src: "/changelog/zanzibar-4.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2024-04-01",
		event: "Visit to Germany",
		title: "Konstanz",
		icon: "🇩🇪",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/konstanz.jpg",
				variant: "4x5",
			},
		],
	},
	{
		date: "2024-04-01",
		event: "Visit to France",
		title: "Strasbourg",
		icon: "🇫🇷",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/strasbourg  4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/strasbourg2  4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/strasbourg3  4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/strasbourg4  4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2024-04-01",
		event: "Visit to Switzerland",
		title: "Lucerne",
		icon: "🇨🇭",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/lucerne  4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/pilatus.png",
				variant: "1x1",
			},
			{
				src: "/changelog/pilatus-2.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2024-02-01",
		event: "Visit to Italy",
		title: "Milan, Verona",
		icon: "🇮🇹",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/verona  4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/milano  4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2023-12-01",
		event: "Visit to Hungary",
		title: "Budapest",
		description: "Beautiful city. I loved it.",
		icon: "🇭🇺",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/budapest 4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2023-02-01",
		event: "Visit to Checz",
		title: "Prague",
		description: "My dream city.",
		icon: "🇨🇿",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/prague 4x5.png",
				variant: "4x5",
			},
			{
				src: "/changelog/prague-2.png",
				variant: "1x1",
			},
			{
				src: "/changelog/prague-3.png",
				variant: "1x1",
			},
			{
				src: "/changelog/prague-4.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2023-09-08",
		event: "Become an uncle",
		title: "His name is Atlas",
		description: "My sister gave birth to a handsome boy.",
		icon: "👶🏻",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/atlas 4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2023-05-06",
		event: "Third car",
		title: "Opel Grandland (2023 model)",
		icon: "🚗",
		dateFormatOptions: dateFormat.day,
	},
	{
		date: "2022-07-10",
		event: "First squba diving",
		title: "It was amazing!",
		description: "I did my first squba diving in Sharm El-Sheikh, Egypt.",
		icon: "🤿",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/scuba.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2019-10-01",
		event: "First tattoo",
		title: "On my right arm",
		icon: "🎨",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/tattoo  4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2022-05-23",
		event: "Second car",
		title: "Peugeot 208 (2021 model)",
		icon: "🚗",
	},
	{
		date: "2014-01-01",
		event: "First HTML5 game",
		title: "Pixel Race Game",
		description: "I created my first HTML5 game.",
		icon: "🎮",
		photos: [
			{
				src: "/changelog/pixel-race.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2015-06-01",
		event: "First pet",
		title: "Mısır",
		icon: "🐈",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/pet.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2010-05-24",
		event: "Lost my dad",
		title: "It was a hard time for me.",
		description: "Show your love to your parents while you can.",
		icon: "🕯️",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/dad.jpeg",
				variant: "1x1",
			},
		],
	},
	{
		date: "2008-11-01",
		event: "Joined Twitter",
		title: "I didn't know what I was doing",
		icon: "🐦",
		dateFormatOptions: dateFormat.month,
	},
	{
		date: "2020-09-01",
		event: "First car",
		title: "BMW 116 (2009 model)",
		icon: "🚗",
		dateFormatOptions: dateFormat.month,
	},
	{
		date: "2024-05-06",
		event: "New website",
		title: "ned.im",
		description: "Finally, I have published own personal website.",
		icon: "🚀",
		dateFormatOptions: dateFormat.day,
	},
	{
		date: "2024-03-01",
		event: "Bought a house",
		title: "I bought a house in Antalya, Turkey",
		description: "First big achievement in my life.",
		icon: "🏠",
		dateFormatOptions: dateFormat.month,
	},
	{
		date: "2021-06-12",
		event: "Married",
		title: "I got married",
		description: "I married the love of my life.",
		icon: "💍",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/nikah 4x5.png",
				variant: "4x5",
			},
		],
	},
	{
		date: "2021-02-21",
		event: "Engaged",
		title: "I got engaged",
		description: "I proposed to my girlfriend. She said yes.",
		icon: "💍",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/proposal.png",
				variant: "1x1",
			},
			{
				src: "/changelog/proposal-1.png",
				variant: "1x1",
			},
			{
				src: "/changelog/proposal-2.png",
				variant: "1x1",
			},
			{
				src: "/changelog/proposal-3.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2021-01-01",
		event: "Relocate",
		title: "Return to Turkey",
		description:
			"I returned to Turkey to work for Defter as a Software Manager & Lead Developer.",
		icon: "🇹🇷",
		dateFormatOptions: dateFormat.month,
	},
	{
		date: "2018-12-01",
		event: "Relocate",
		title: "Moved to Montenegro",
		description: "Accepted an offer from Defter and relocated to Montenegro.",
		icon: "🇲🇪",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/montenegro 4x3.png",
				variant: "4x3",
			},
		],
	},
	{
		date: "2018-10-01",
		event: "Military Service",
		title: "Short term military service",
		description:
			"I served in the Turkish Armed Forces for 21 days as a short-term military service.",
		icon: "🎖️",
		dateFormatOptions: dateFormat.month,
		photos: [
			{
				src: "/changelog/asker-1.png",
				variant: "1x1",
			},
			{
				src: "/changelog/asker-2.png",
				variant: "1x1",
			},
			{
				src: "/changelog/asker-3.png",
				variant: "1x1",
			},
			{
				src: "/changelog/asker-4.png",
				variant: "1x1",
			},
			{
				src: "/changelog/asker-5.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2015-09-01",
		event: "First startup",
		title: "whodidthis.io",
		description:
			"A platform that helps people to find out who did what in their projects.",
		icon: "💡",
		dateFormatOptions: dateFormat.year,
	},
	{
		date: "2012-08-01",
		event: "Moved to Istanbul",
		title: "The big city",
		description: "Moved to Istanbul to work for Efabrika.",
		icon: "🚌",
		photos: [
			{
				src: "/changelog/efabrika.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "2012-01-28",
		event: "First commit",
		title: "First commit on GitHub",
		description: "My open source journey started.",
		icon: "🎉",
		dateFormatOptions: dateFormat.day,
	},
	{
		date: "2010-01-01",
		event: "First Job",
		title: "My first job as a developer",
		icon: "💼",
		dateFormatOptions: dateFormat.month,
	},
	{
		date: "2008-01-01",
		event: "Education",
		title: "Drop out from Ege University",
		description:
			"I decided to drop out from university to pursue my career in software development.",
		icon: "🎓",
	},
	{
		date: "2005-01-01",
		event: "Education",
		title: "I started my university education at Ege University",
		description: "My major was football trainer 😀",
		icon: "🎓",
	},
	{
		date: "2002-01-01",
		event: "Football",
		title: "I started playing football",
		description:
			"I played football for 6 years. I was actually very good at it.",
		icon: "⚽",
	},
	{
		date: "1990-01-01",
		event: "Relocate",
		title: "A journey to Turkey",
		description:
			"My family moved to Turkey when I was 2 years old. I grew up in Izmir.",
		icon: "🇹🇷",
		photos: [
			{
				src: "/changelog/family.png",
				variant: "1x1",
			},
		],
	},
	{
		date: "1988-02-10",
		event: "Born",
		title: "I was born in 🇧🇬 Bulgaria, Khardzali.",
		description: "2nd child of the family. I have an older sister.",
		icon: "👶🏻",
		dateFormatOptions: dateFormat.day,
		photos: [
			{
				src: "/changelog/bg.png",
				variant: "1x1",
			},
			{
				src: "/changelog/bg-2 4x3.png",
				variant: "4x3",
			},
			{
				src: "/changelog/bg-3 4x3.png",
				variant: "4x3",
			},
		],
	},
] as const;

export const changelog = changelogItems.sort(
	(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const projects = [
	{
		name: "gider.im",
		released: "2024-05-26",
		description: "Privacy focused income & expense tracking app.",
		link: { href: "https://gider.im", label: "gider.im" },
		logo: <GiderimLogo className="size-10" />,
	},
	{
		name: "smashing.tools",
		released: "2023-01-01",
		description: "Curated best starter kits, UI components & resources.",
		link: { href: "https://smashing.tools", label: "smashing.tools" },
		logo: <IconSmashing className="size-10" />,
	},
	{
		name: "Defter",
		released: "2023-01-01",
		description: "Hayatı kolaylaştıran teknolojik defter.",
		link: { href: "https://birdefter.com", label: "birdefter.com" },
	},
	{
		name: "Noty (Deprecated)",
		released: "2023-01-01",
		deprecated: "2023-01-01",
		description:
			"A dependency-free, simple notification plugin with no dependencies.",
		link: { href: "/noty", label: "ned.im/noty" },
		logo: <></>,
	},
	{
		name: "Yeni Evim Kredisi",
		description:
			"Calculates monthly payments and total loan repayment based on entered details.",
		link: { href: "https://yenievimkredisi.com", label: "yenievimkredisi.com" },
	},
];
