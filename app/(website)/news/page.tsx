import { Container } from "@/components/blocks/container";
import { NewsList } from "@/components/blocks/news-list";
import {
	IconClock,
	IconExternalLink,
	IconNews,
	IconTrendingUp,
} from "@tabler/icons-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "快报 - News",
	description: "最新资讯和快报，了解最新动态和趋势。",
};

export const revalidate = 1800; // 30分钟重新验证一次

export default function NewsPage() {
	const features = [
		{
			icon: <IconNews className="w-5 h-5" />,
			title: "实时更新",
			description: "获取最新的资讯动态",
		},
		{
			icon: <IconExternalLink className="w-5 h-5" />,
			title: "外部链接",
			description: "直接访问原始资源",
		},
		{
			icon: <IconClock className="w-5 h-5" />,
			title: "时效性强",
			description: "关注当下热点话题",
		},
		{
			icon: <IconTrendingUp className="w-5 h-5" />,
			title: "趋势洞察",
			description: "发现行业发展趋势",
		},
	];

	return (
		<Container>
			<div className="mt-16">
				<div className="space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold tracking-tight">快报</h1>
						<p className="text-muted-foreground">
							这里汇集了最新的资讯和快报，帮你快速了解当前的热点和趋势。
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{features.map((feature, index) => (
							<div
								key={index}
								className="p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
							>
								<div className="flex flex-col items-center text-center space-y-2">
									<div className="p-2 rounded-full bg-primary/10 text-primary">
										{feature.icon}
									</div>
									<h3 className="font-medium">{feature.title}</h3>
									<p className="text-sm text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<NewsList />
			</div>
		</Container>
	);
}
