"use client";

import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GeekPost } from "@/types/geek";
import { IconBookmark, IconPlayerPlayFilled } from "@tabler/icons-react";
import Link from "next/link";

interface GeekCardProps {
	post: GeekPost;
}

function getYouTubeThumbnail(url: string | undefined) {
	if (!url) return "";
	const videoId = url.split("/").pop()?.split("?")[0];
	return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function GeekCard({ post }: GeekCardProps) {
	return (
		<TooltipProvider>
			<Link href={`/geek/${post.slug}`} className="block group h-full">
				<div className="bg-card rounded-2xl w-full h-full flex flex-col transition-all duration-300 hover:translate-y-[-2px] border border-border/40 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]">
					{/* 视频预览区域 */}
					<div className="relative w-full aspect-[16/9] bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/5 dark:to-blue-600/5 overflow-hidden rounded-t-2xl">
						<div className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-white/10 rounded-xl shadow-sm backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
							<IconBookmark className="w-5 h-5 text-blue-500/50 dark:text-blue-400/50" />
						</div>
						{/* 播放按钮 */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-16 h-16 bg-white/90 dark:bg-white/10 rounded-full shadow-sm backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
								<IconPlayerPlayFilled className="w-8 h-8 text-blue-500/80 dark:text-blue-400/80 translate-x-0.5" />
							</div>
						</div>
						{/* 封面图片 */}
						<img
							src={getYouTubeThumbnail(post.videoUrl)}
							alt={post.title}
							className="absolute inset-0 w-full h-full object-cover"
						/>
					</div>

					{/* 内容区域 */}
					<div className="p-6 bg-card dark:bg-card/30 border-t border-border/40 flex-1 flex flex-col rounded-b-2xl">
						<div className="flex-1">
							<Tooltip>
								<TooltipTrigger asChild>
									<h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-500 transition-colors">
										{post.title}
									</h3>
								</TooltipTrigger>
								<TooltipContent
									side="top"
									sideOffset={5}
									className="z-[100] max-w-[300px] bg-white/95 dark:bg-zinc-900/95 text-sm px-4 py-2.5 rounded-xl shadow-[0_5px_25px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_25px_-5px_rgba(0,0,0,0.3)] border border-border/40 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
								>
									<div className="font-medium text-foreground/90">
										{post.title}
									</div>
								</TooltipContent>
							</Tooltip>
							<p className="text-sm text-muted-foreground mb-4">{post.date}</p>
						</div>
						<div className="flex items-center gap-2">
							<Badge
								variant="secondary"
								className="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 cursor-default"
							>
								技术分享
							</Badge>
							<Badge
								variant="secondary"
								className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 transition-colors"
							>
								查看详情 →
							</Badge>
						</div>
					</div>
				</div>
			</Link>
		</TooltipProvider>
	);
}
