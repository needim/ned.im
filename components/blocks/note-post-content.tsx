"use client";

import { formattedDate } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";
import Link from "next/link";

const ArticleLayout = dynamic(() => import("@/app/(website)/article-layout"), {
	ssr: true,
});
const ClientSideComments = dynamic(
	() => import("@/components/blocks/comments").then((mod) => mod.Comments),
	{ ssr: false },
);
const MDXContent = dynamic(
	() => import("@/components/mdx-content").then((mod) => mod.MDXContent),
	{
		ssr: false,
		loading: () => (
			<div className="animate-pulse">
				<div className="h-4 bg-muted rounded w-3/4 mb-4" />
				<div className="h-4 bg-muted rounded w-1/2 mb-4" />
				<div className="h-4 bg-muted rounded w-5/6" />
			</div>
		),
	},
);

interface NotePostContentProps {
	post: {
		metadata: {
			title: string;
			date: string;
			description?: string;
			tags?: string[];
			column: string;
		};
		content: MDXRemoteSerializeResult;
	};
	columnData: {
		title: string;
		description: string;
		slug: string;
	};
	columnSlug: string;
	postSlug: string;
}

export function NotePostContent({
	post,
	columnData,
	columnSlug,
}: NotePostContentProps) {
	return (
		<ArticleLayout>
			<div className="mb-8">
				<Link
					href={`/notes/${columnSlug}`}
					className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
				>
					<IconArrowLeft className="w-4 h-4" />
					返回{columnData.title}
				</Link>
			</div>

			<header className="not-prose mb-8">
				<h1 className="text-4xl font-bold tracking-tight">
					{post.metadata.title}
				</h1>
				<div className="mt-2 text-sm text-muted-foreground">
					<time dateTime={post.metadata.date}>
						{formattedDate(post.metadata.date)}
					</time>
				</div>
				{post.metadata.description && (
					<p className="mt-4 text-muted-foreground">
						{post.metadata.description}
					</p>
				)}
				{post.metadata.tags && post.metadata.tags.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{post.metadata.tags.map((tag) => (
							<span key={tag} className="text-sm text-muted-foreground">
								#{tag}
							</span>
						))}
					</div>
				)}
			</header>

			<div className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none">
				<MDXContent content={post.content} />
			</div>

			<div className="mt-16">
				<ClientSideComments />
			</div>
		</ArticleLayout>
	);
}
