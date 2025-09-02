"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";

interface CategoryCardProps {
	title: string;
	description: string;
	slug: string;
	cover: string;
	color?: string;
	postCount?: number;
	className?: string;
}

export const CategoryCard = memo(function CategoryCard({
	title,
	description,
	slug,
	cover,
	color,
	postCount,
	className,
}: CategoryCardProps) {
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	return (
		<Link
			href={`/notes/${slug}`}
			className={cn(
				"group relative block rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
				"hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-200",
				"hover:shadow-lg hover:-translate-y-1",
				"focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
				className,
			)}
			aria-label={`浏览 ${title} 专栏，${description}${postCount ? `，共 ${postCount} 篇文章` : ""}`}
		>
			<div className="flex items-start space-x-4">
				{/* Cover Image */}
				<div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
					{!imageError ? (
						<>
							<Image
								src={cover}
								alt={`${title}专栏封面`}
								fill
								className={cn(
									"object-cover transition-all duration-300 group-hover:scale-105",
									imageLoading ? "opacity-0" : "opacity-100",
								)}
								sizes="64px"
								priority={false}
								loading="lazy"
								quality={85}
								placeholder="blur"
								blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
								onLoad={() => setImageLoading(false)}
								onError={() => setImageError(true)}
							/>
							{/* Loading placeholder */}
							{imageLoading && (
								<div
									className="absolute inset-0 bg-zinc-200 dark:bg-zinc-700 animate-pulse"
									aria-hidden="true"
								/>
							)}
							{/* Gradient Overlay */}
							{color && !imageLoading && (
								<div
									className={cn(
										"absolute inset-0 bg-gradient-to-br opacity-60",
										color,
									)}
									aria-hidden="true"
								/>
							)}
						</>
					) : (
						/* Fallback when image fails to load */
						<div
							className={cn(
								"absolute inset-0 bg-gradient-to-br flex items-center justify-center",
								color ||
									"from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800",
							)}
						>
							<span
								className="text-xs font-medium text-zinc-600 dark:text-zinc-400 text-center"
								aria-hidden="true"
							>
								{title.charAt(0)}
							</span>
						</div>
					)}
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
						{title}
					</h3>
					<p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-2">
						{description}
					</p>
					{postCount !== undefined && (
						<span
							className="text-xs text-zinc-500 dark:text-zinc-500"
							aria-label={`共有 ${postCount} 篇文章`}
						>
							{postCount} 篇文章
						</span>
					)}
				</div>
			</div>
		</Link>
	);
});
