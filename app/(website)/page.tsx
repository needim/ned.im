import { CareerCard } from "@/components/blocks/career-card";
import { Container } from "@/components/blocks/container";
import { ProjectCard } from "@/components/blocks/project-card";
import {
	BilibiliIcon,
	GitHubIcon,
	QQIcon,
	XIcon,
	YouTubeIcon,
} from "@/components/blocks/social-icons";
import { SocialLink } from "@/components/blocks/social-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
};

export default function Readme() {
	const myCareerItems = [
		{
			from: 2024,
			to: null,
			title: "Content Creator",
			company: { name: "Self-employed", url: "https://www.laogou717.com" },
			location: "Zhengzhou, China",
			description:
				"Creating content focused on AI technology and productivity tools.",
		},
		{
			from: 2023,
			to: 2024,
			title: "Video Editor",
			company: { name: "E-commerce Company", url: null },
			location: "Zhengzhou, China",
			description: "Worked as a video editor from October 2023 to May 2024.",
		},
		{
			from: 2021,
			to: 2023,
			title: "Product Photographer & Video Editor",
			company: { name: "E-commerce Company", url: null },
			location: "Zhengzhou, China",
			description:
				"Worked as a product photographer and video editor from May 2021 to September 2023.",
		},
		{
			from: 2020,
			to: 2021,
			title: "Self Study Period",
			company: { name: "Self-employed", url: null },
			location: "Zhengzhou, China",
			description: "Spent a year in self-study and personal development.",
		},
	];

	const myProjects = [
		{
			title: "AI Navigation",
			description: "A curated collection of AI tools and resources",
			href: "https://nav.laogou717.com",
			icon: GitHubIcon,
		},
		{
			title: "Personal Blog",
			description: "My personal blog built with Next.js",
			href: "https://github.com/laogou717/ned.im",
			icon: GitHubIcon,
		},
	];

	return (
		<>
			<Container className="mt-12 md:mt-16">
				<div className="max-w-2xl">
					<h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl md:text-4xl">
						Jonas (老狗)
					</h1>
					<p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
						Hello 👋, I’m Shenfan Laogou, an AI enthusiast, video editor, and
						photographer. <br /> 你好
						👋，我是神烦老狗，一名AI爱好者、视频编辑和摄影师。
					</p>
					<p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
						I’m dedicated to bridging the information gap and helping beginners
						quickly grasp AI applications. I feel like I’m helping my former
						self, and it brings me immense joy. If my work gains attention or
						recognition, that’s truly an honor, and I deeply appreciate every
						bit of feedback. <br />{" "}
						我致力于打破信息差，帮助新手快速掌握AI应用。我一直觉得自己是在帮助曾经的那个自己，做这件事让我感到无比快乐。如果我的分享能得到大家的关注和认可，那真是我的荣幸，我非常感激每一条反馈。
					</p>
					<p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
						If you’re interested in following my journey, feel free to visit my
						blog’s Timeline\Notes, where you’ll find my story, thoughts,
						struggles, and growth. You can also click the button below to follow
						my other social media accounts for more updates. <br />{" "}
						如果你有兴趣了解我的更多动态，可以访问我的博客
						Timeline/Notes，那里有我的生平故事、一些思考、困惑和成长历程。你也可以点击下方的按钮关注我的社交媒体账号，获取更多内容。
					</p>
					<div className="mt-4 flex gap-4">
						<SocialLink
							href="https://x.com/shenfanlaogou"
							icon={XIcon}
							aria-label="Follow on X"
						/>
						<SocialLink
							href="https://github.com/laogou717"
							icon={GitHubIcon}
							aria-label="Follow on GitHub"
						/>
						<SocialLink
							href="https://space.bilibili.com/46377861"
							icon={BilibiliIcon}
							aria-label="Follow on Bilibili"
						/>
						<SocialLink
							href="https://qm.qq.com/cgi-bin/qm/qr?k=Sy5kzgNsXxWdy66ijJmauHgcT2jL9CKB&jump_from=webapi&authKey=oBzIk0cUqGHl3ihCKLFi7ZnTc5W5Be6LSitr3FF+lOpi8ScyzX2C/39iJBSKtzwf"
							icon={QQIcon}
							aria-label="Follow on QQ"
						/>
						<SocialLink
							href="https://youtube.com/@shenfanlaogou"
							icon={YouTubeIcon}
							aria-label="Follow on YouTube"
						/>
					</div>
				</div>
			</Container>

			<Container className="mt-16 md:mt-12">
				<h2 className="text-3xl">Projects</h2>
				<p className="text-muted-foreground mb-6 mt-2">
					Some of my recent projects and websites
					<br />
					我的一些近期项目和网站
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{myProjects.map((project, index) => (
						<ProjectCard key={index} {...project} />
					))}
				</div>
			</Container>

			<Container className="mt-16 md:mt-12">
				<h2 className="text-3xl">Career</h2>
				<p className="text-muted-foreground mb-6 mt-2">
					With 14+ years of self-learning experience, most of my skills were
					acquired through the internet.
					<br />
					我有 14 年以上的自学经验，大部分技能都是通过互联网获得的。
				</p>
				<div className="grid grid-cols-1 gap-3">
					{myCareerItems.map((item, index) => (
						<CareerCard key={index} item={item} />
					))}
				</div>
			</Container>
		</>
	);
}
