import { IconSmashing } from "@/components/icons/smashing";
import { IconBalloonFilled, IconCarCrash } from "@tabler/icons-react";
import { clsx, type ClassValue } from "clsx";
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
  formatOpts?: Intl.DateTimeFormatOptions | undefined
) =>
  new Date(date).toLocaleDateString(
    "en-US",
    formatOpts
      ? formatOpts
      : {
          year: "numeric",
        }
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
      "I spent two months working for 90Pixel before accepting an offer from Defter and relocating to Montenegro.",
  },
  {
    from: 2017,
    to: 2018,
    title: "Full Stack Developer",
    company: { name: "Freelancer", url: null },
    location: "Turkey",
    description:
      "I've taken a gap year to pursue my passion for freelance work. Through this experience, I've gained invaluable skills and had the opportunity to work with a diverse range of clients.",
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

export const changelog = [
  {
    date: "2023-11-01",
    event: "Visit to Greece",
    title: "Kavala",
    icon: "🇬🇷",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2023-08-01",
    event: "Visit to Greece",
    title: "Samos Island",
    desciption: "Big family trip.",
    icon: "🇬🇷",
    dateFormatOptions: dateFormat.month,
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
  },
  {
    date: "2023-04-21",
    event: "Visit to Greece",
    title: "Chios Island",
    icon: "🇬🇷",
    dateFormatOptions: dateFormat.day,
  },
  {
    date: "2022-07-08",
    event: "Visit to Egypt",
    title: "Sharm El-Sheikh",
    desciption: "Food was terrible for me.",
    icon: "🇪🇬",
    dateFormatOptions: dateFormat.day,
  },
  {
    date: "2021-06-16",
    event: "Honeymoon",
    title: "Zanzibar",
    desciption: "We went to Zanzibar for our honeymoon.",
    icon: "🏝️",
    dateFormatOptions: dateFormat.day,
  },
  {
    date: "2024-04-01",
    event: "Visit to Germany",
    title: "Konstanz",
    icon: "🇩🇪",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2024-04-01",
    event: "Visit to France",
    title: "Strausburg",
    icon: "🇫🇷",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2024-04-01",
    event: "Visit to Switzerland",
    title: "Lucerne",
    icon: "🇨🇭",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2024-02-01",
    event: "Visit to Italy",
    title: "Milan",
    icon: "🇮🇹",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2023-12-01",
    event: "Visit to Hungary",
    title: "Budapest",
    desciption: "Beautiful city. I loved it.",
    icon: "🇭🇺",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2023-02-01",
    event: "Visit to Checz",
    title: "Prague",
    desciption: "My dream city.",
    icon: "🇨🇿",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2023-09-08",
    event: "Become an uncle",
    title: "Oh boy!",
    desciption: "My sister gave birth to a handsome boy.",
    icon: "👶🏻",
    dateFormatOptions: dateFormat.day,
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
    desciption: "I did my first squba diving in Sharm El-Sheikh, Egypt.",
    icon: "🤿",
    dateFormatOptions: dateFormat.day,
  },
  {
    date: "2019-10-01",
    event: "First tattoo",
    title: "On my right arm",
    icon: "🎨",
    dateFormatOptions: dateFormat.month,
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
    desciption: "I created my first HTML5 game.",
    icon: "🎮",
  },
  {
    date: "2015-06-01",
    event: "First pet",
    title: "Mısır",
    icon: "🐈",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2010-05-24",
    event: "Lost my dad",
    title: "It was a hard time for me.",
    icon: "🕯️",
    dateFormatOptions: dateFormat.day,
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
    desciption: "Finally, I have published own personal website.",
    icon: "🚀",
    dateFormatOptions: dateFormat.day,
  },
  {
    date: "2024-03-01",
    event: "Bought a house",
    title: "I bought a house in Antalya, Turkey",
    desciption: "First big achievement in my life.",
    icon: "🏠",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2021-06-12",
    event: "Married",
    title: "I got married",
    desciption: "I married the love of my life.",
    icon: "💍",
    dateFormatOptions: dateFormat.day,
  },
  {
    date: "2021-02-21",
    event: "Engaged",
    title: "I got engaged",
    desciption: "I proposed to my girlfriend. She said yes.",
    icon: "💍",
    dateFormatOptions: dateFormat.day,
  },
  {
    date: "2021-01-01",
    event: "Relocate",
    title: "Return to Turkey",
    desciption:
      "I returned to Turkey to work for Defter as a Software Manager & Lead Developer.",
    icon: "🇹🇷",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2018-12-01",
    event: "Relocate",
    title: "Moved to Montenegro",
    desciption: "Accepted an offer from Defter and relocated to Montenegro.",
    icon: "🇲🇪",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2018-10-01",
    event: "Military Service",
    title: "Short term military service",
    desciption:
      "I served in the Turkish Armed Forces for 21 days as a short-term military service.",
    icon: "🎖️",
    dateFormatOptions: dateFormat.month,
  },
  {
    date: "2015-09-01",
    event: "First startup",
    title: "whodidthis.io",
    desciption:
      "A platform that helps people to find out who did what in their projects.",
    icon: "💡",
    dateFormatOptions: dateFormat.year,
  },
  {
    date: "2012-08-01",
    event: "Moved to Istanbul",
    title: "The big city",
    desciption: "Moved to Istanbul to work for Efabrika.",
    icon: "🚌",
  },
  {
    date: "2012-01-28",
    event: "First commit",
    title: "First commit on GitHub",
    desciption: "My open source journey started.",
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
    desciption:
      "I decided to drop out from university to pursue my career in software development.",
    icon: "🎓",
  },
  {
    date: "2005-01-01",
    event: "Education",
    title: "I started my university education at Ege University",
    desciption: "My major was football trainer 😀",
    icon: "🎓",
  },
  {
    date: "2002-01-01",
    event: "Football",
    title: "I started playing football",
    desciption:
      "I played football for 6 years. I was actually very good at it.",
    icon: "⚽",
  },
  {
    date: "1990-01-01",
    event: "Relocate",
    title: "A journey to Turkey",
    desciption:
      "My family moved to Turkey when I was 2 years old. I grew up in Izmir.",
    icon: "🇹🇷",
  },
  {
    date: "1988-02-10",
    event: "Born",
    title: "I was born in 🇧🇬 Bulgaria, Khardzali.",
    desciption: "2nd child of the family. I have an older sister.",
    icon: "👶🏻",
    dateFormatOptions: dateFormat.day,
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const projects = [
  {
    name: "Smashing Tools",
    released: "2023-01-01",
    description: "Curated best starter kits, UI components & resources.",
    link: { href: "https://smashing.tools", label: "smashing.tools" },
    logo: <IconSmashing className="size-10" />,
  },
  {
    name: "Codename: Fin",
    released: null,
    description:
      "A new project that I'm working on. I can't share any details yet.",
    link: { href: "#", label: "Coming soon" },
    logo: <></>,
  },
  {
    name: "Defter",
    released: "2023-01-01",
    description: "Hayatı kolaylaştıran teknolojik defter.",
    link: { href: "https://birdefter.com", label: "birdefter.com" },
    // logo: logoPlanetaria,
  },
  {
    name: "Radix UI & Tailwind",
    description: "Radix UI Themes Integration with Tailwind CSS",
    link: {
      href: "https://ned.im/radix-ui-themes-with-tailwind",
      label: "ned.im/radix-ui-theme...",
    },
    logo: <></>,
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
    // logo: ,
  },
  {
    name: "useOverlay",
    description: "If Floating UI and Framer Motion were to merge.",
    link: {
      href: "https://ned.im/react-useoverlay",
      label: "ned.im/react-useoverlay",
    },
    logo: <IconBalloonFilled className="size-10" />,
  },

  {
    name: "Pixel Race Game",
    description:
      "A simple HTML5 game that I created in 2014. It was my first game.",
    link: {
      href: "https://ned.im/pixel-race-game",
      label: "ned.im/pixel-race-game",
    },
    logo: <IconCarCrash className="size-10" />,
  },
];
