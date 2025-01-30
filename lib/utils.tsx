import GiderimLogo from "@/components/blocks/giderim-logo";
import IconGithub from "@/components/icons/github";
import { IconSmashing } from "@/components/icons/smashing";
import { IconWorld } from "@tabler/icons-react";
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
  formatOpts?: Intl.DateTimeFormatOptions | undefined
) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString(
    "zh-CN",
    formatOpts || {
      year: "numeric"
    }
  );
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/timeline", label: "Timeline" },
  { href: "/notes", label: "Notes" },
  { href: "/geek", label: "Geek" },
  { href: "/qa", label: "Q&A" },
];

export const careerItems = [
  {
    from: 2021,
    to: null,
    title: "Software Manager & Lead Developer",
    company: { name: "Defter", url: "https://birdefter.com" },
    location: "Istanbul, Turkey",
    description:
      "I am currently working at Defter as a Software Manager & Lead Developer.",
    subRoles: [
      {
        from: 2019,
        to: 2021,
        title: "Full Stack Developer",
        company: { name: "Defter", url: "https://birdefter.com" },
        location: "Podgorica, Montenegro",
        description:
          "I was responsible for the development of the company's CRM products.",
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

const dateFormat = {
  day: {
    year: "numeric" as const,
    month: "long" as const,
    day: "numeric" as const,
    locale: "zh-CN"
  },
  month: {
    year: "numeric" as const,
    month: "long" as const,
    locale: "zh-CN"
  },
  year: {
    year: "numeric" as const,
    locale: "zh-CN"
  },
};

export const timelineItems = [
  {
    date: '2024-09-03',
    event: '域名迁移',
    title: '域名迁移到Cloudflare',
    description: '最终还是把域名转移到了Cloudflare上 😌',
    icon: '🌐',
    photos: [
      { src: 'https://img.laogou717.com/file/d749a9314c9861c45ed13.png', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2024-08-23',
    event: '新域名上线',
    title: '新的开始',
    description: '欢迎来到 www.laogou717.com',
    icon: '🎉',
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2024-04-11',
    event: 'OneAPI部署',
    title: 'OneAPI部署经验',
    description: 'OneAPI部署其实没有大家想的那么复杂，找个免费的SQL数据库对照着文档做基本不会有大问题。',
    icon: '💻',
    photos: [
      { src: 'https://img.laogou717.com/file/335d626feb22b52bc4ade.jpg', variant: '4x3' }
    ],
    link: 'https://github.com/songquanpeng/one-api',
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2024-02-15',
    event: '失眠的夜',
    title: '深夜的思绪',
    description: '距离开工还剩两天,根本睡不着,完全不想上班啊...',
    icon: '🌙',
    dateFormatOptions: dateFormat.day,
    metadata: {
      time: '03:55:00',
      location: '卧室',
      music: {
        platform: 'netease',
        id: '1836462679',
        url: 'https://music.163.com/#/song?id=1836462679'
      }
    }
  },
  {
    date: '2024-01-09',
    event: '视频创作',
    title: '一只Emo的大肥猫',
    description: '分享了一个关于猫咪的视频作品',
    icon: '🎥',
    dateFormatOptions: dateFormat.day,
    metadata: {
      video: 'https://player.bilibili.com/player.html?aid=752652004&bvid=BV12k4y197v6&cid=176424111&autoplay=0',
      from: '神烦老狗'
    }
  },
  {
    date: '',
    event: '无业游民全职博主',
    title: '追逐梦想的开始',
    description: '没办法，我确实不喜欢被人管着，刚好做视频是我喜欢的事情，虽然没什么收入，但只要饿不死，我希望可以一直做下去。',
    icon: '🎥',
    photos: [
      { src: '/changelog/2024-01-01-全职博主/IMG_2055.JPG', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_2054.JPG', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_2053.JPG', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0482.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0012.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0499.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_1771.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_1762.jpg', variant: '4x5' },
      { src: '/changelog/2024-01-01-全职博主/IMG_0716.jpg', variant: '4x5' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2022-01-01',
    event: '遇见了她',
    title: '生命中的温暖',
    description: '她跟以前的我很像，很胆小、很幼稚但很善良。',
    icon: '💝',
    photos: [
      { src: '/changelog/2022-01-01-遇见她/IMG_2028.JPG', variant: '4x3' },
      { src: '/changelog/2022-01-01-遇见她/IMG_2027.JPG', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.day
  },
  {
    date: '2021',
    event: '电商实习生涯',
    title: '电商实习生涯',
    description: '在电商公司实习，我说我希望一月能挣四千块，面试的人笑了出来，说当然可以了。',
    icon: '💼',
    photos: [
      { src: '/changelog/2021-06-01-电商实习/IMG_2066.JPG', variant: '1x1' },
      { src: '/changelog/2021-06-01-电商实习/IMG_2033.PNG', variant: '1x1' },
      { src: '/changelog/2021-06-01-电商实习/IMG_2031.JPG', variant: '4x5' },
      { src: '/changelog/2021-06-01-电商实习/IMG_2030.JPG', variant: '4x5' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2018-09-01',
    event: '警校生活',
    title: '寻找自我的三年',
    description: '半封闭式的管理让我不适应，但我找到了自己的方向 - 通过参加社团剪辑视频来逃避训练。每天阅读世界名著，自学PS，想要把浪费的时间都补回来。',
    icon: '👮',
    photos: [
      { src: '/changelog/2018-09-01-警校/IMG_2040.JPG', variant: '4x3' },
      { src: '/changelog/2018-09-01-警校/IMG_2039.JPG', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2018-03-01',
    event: '电子厂流水线',
    title: '短暂的尝试与逃离',
    description: '在苹果蓝牙耳机生产线上，我尝试改变自己内向的性格。学会了16个工位的工作，本可以成为全能工。但在一次讲解时，一个新人的眼神让我退缩了，我又变回了那个内向的自己。最后我选择了逃回老家。',
    icon: '🏭',
    photos: [
      { src: '/changelog/2018-03-01-电子厂/IMG_2045.JPG', variant: '1x1' },
      { src: '/changelog/2018-03-01-电子厂/IMG_2044.JPG', variant: '1x1' },
      { src: '/changelog/2018-03-01-电子厂/IMG_2042.JPG', variant: '1x1' }
    ],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2008',
    event: '摄影初体验',
    title: '创意的萌芽',
    description: '用母亲的摩托罗拉翻盖手机拍摄"特技视频"，虽然只能录制一分钟的无声视频，但我拍了很多有趣的画面，比如瞬间移动、第一视角的打斗视频。这是我第一次接触摄影创作。',
    icon: '📱',
    photos: [{ src: '/changelog/2008-01-01-第一次拍摄/motorola.png', variant: '4x5' }],
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2005',
    event: '求学之路',
    title: '懵懂的学前班',
    description: '那是半年级，也就是现在说的学前班。课本的内容我听不懂，我跟发小一块坐在最后一排靠窗的座位，那是学习的开始。',
    icon: '📚',
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2004',
    event: '童年时光',
    title: '爷爷奶奶家的快乐',
    description: '和一群堂哥堂弟在爷爷奶奶家玩耍，那时的生活简单而快乐。',
    icon: '👶',
    dateFormatOptions: dateFormat.year
  },
  {
    date: '2000',
    event: '外婆家的日子',
    title: '温暖的记忆',
    description: '父亲外出务工，奶奶要带的孙子很多，母亲带着我在外婆家生活了两三年。',
    icon: '👵',
    dateFormatOptions: dateFormat.year
  },
  {
    date: '1999-01-24',
    event: '生命的开始',
    title: '河南小村庄',
    description: '我出生在中国河南的一个小村庄里，是父母结婚七年后的第一个孩子，我还有个小我三岁的弟弟。',
    icon: '👶',
    photos: [
      { src: '/changelog/1999-01-24-出生/IMG_2051.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2050.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2049.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2048.JPG', variant: '4x5' },
      { src: '/changelog/1999-01-24-出生/IMG_2047.JPG', variant: '4x3' },
      { src: '/changelog/1999-01-24-出生/IMG_2046.JPG', variant: '1x1' },
      { src: '/changelog/1999-01-24-出生/IMG_2041.JPG', variant: '4x3' }
    ],
    dateFormatOptions: dateFormat.day
  }
];

export const changelog = timelineItems.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const projects = [
  {
    name: "gider.im (PWA)",
    githubSlug: "needim/gider.im-pwa",
    released: "2024-05-26",
    description: "Privacy focused income & expense tracking app.",
    logo: <GiderimLogo className="size-10" />,
    links: [
      {
        href: "https://gider.im",
        label: "Website",
        icon: IconWorld,
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
    name: "gider.im (Website)",
    githubSlug: "needim/gider.im-website",
    released: "2024-05-26",
    description: "Privacy focused income & expense tracking app.",
    logo: <GiderimLogo className="size-10" />,
    links: [
      {
        href: "https://gider.im",
        label: "Website",
        icon: IconWorld,
      },
      {
        href: "https://github.com/needim/gider.im-website",
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
    description: "Curated best starter kits, UI components & resources.",
    links: [
      {
        href: "https://smashing.tools",
        label: "Website",
        icon: IconWorld,
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
    description: "You're currently browsing my personal website.",
    links: [{ href: "/", label: "Website", icon: IconWorld }],
    featured: false,
    metrics: [],
  },
  {
    name: "noty",
    githubSlug: "needim/noty",
    released: "2023-01-01",
    logo: <></>,
    deprecated: true,
    description:
      "A dependency-free, notification plugin with no deps. ⛔️ Deprecated.",
    links: [
      { href: "/noty", label: "Website", icon: IconWorld },
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
      "Creating fake 3D world with 2D colliders and sprites in Unity.",
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
