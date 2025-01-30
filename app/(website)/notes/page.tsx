import { Container } from "@/components/blocks/container";
import Link from "next/link";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { formattedDate } from "@/lib/utils";
import { IconClock } from "@tabler/icons-react";

interface Post {
	slug: string;
	metadata: {
		title: string;
		date: string;
		description?: string;
		tags?: string[];
	};
}

function estimateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

async function getPosts(): Promise<Post[]> {
	const postsDirectory = path.join(process.cwd(), 'content/notes');
	const files = await fs.readdir(postsDirectory);
	
	const posts = await Promise.all(
		files
			.filter(file => file.endsWith('.mdx'))
			.map(async (file) => {
				const slug = file.replace(/\.mdx$/, '');
				const filePath = path.join(postsDirectory, file);
				const fileContent = await fs.readFile(filePath, 'utf8');
				const { data } = matter(fileContent);
				
				return {
					slug,
					metadata: {
						title: data.title as string,
						date: data.date as string,
						description: data.description as string | undefined,
						tags: data.tags as string[] | undefined,
					}
				};
			})
	);

	return posts.sort((a, b) => {
		if (a.metadata.date && b.metadata.date) {
			return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
		}
		return 0;
	});
}

export default async function NotesPage() {
	const posts = await getPosts();

	return (
		<Container>
			<div className="mx-auto max-w-2xl mt-16">
				<h1 className="text-4xl font-bold tracking-tight mb-8">文章</h1>
				<div className="space-y-8">
					{posts.map((post) => (
						<article key={post.slug} className="group relative">
							<div className="relative">
								<h2 className="text-2xl font-semibold tracking-tight">
									<Link href={`/notes/${post.slug}`} className="hover:text-primary transition-colors">
										{post.metadata.title}
									</Link>
								</h2>
								<div className="mt-2 text-sm text-muted-foreground">
									<time dateTime={post.metadata.date}>{post.metadata.date}</time>
								</div>
								{post.metadata.description && (
									<p className="mt-4 text-muted-foreground">
										{post.metadata.description}
									</p>
								)}
								{post.metadata.tags && post.metadata.tags.length > 0 && (
									<div className="mt-3 flex flex-wrap gap-2 text-sm text-muted-foreground">
										{post.metadata.tags.map((tag) => (
											<span key={tag}>#{tag}</span>
										))}
									</div>
								)}
							</div>
						</article>
					))}
				</div>
			</div>
		</Container>
	);
}
