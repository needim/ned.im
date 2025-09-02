import { CategoryCard } from "@/components/blocks/category-card";
import { Comments } from "@/components/blocks/comments";
import { Container } from "@/components/blocks/container";
import { columns } from "@/config/columns";
import { Suspense } from "react";

export default function NotesPage() {
	return (
		<Container className="mt-12 md:mt-16">
			<main className="animate-fade-up space-y-16">
				{/* Page Header */}
				<header className="max-w-2xl">
					<h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl md:text-4xl">
						专栏
					</h1>
					<p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
						选择一个专栏以浏览相关文章，探索不同主题的内容和思考。
					</p>
				</header>

				{/* Categories Grid */}
				<section aria-labelledby="categories-heading">
					<h2 id="categories-heading" className="sr-only">
						专栏分类
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{columns.map((column) => (
							<CategoryCard
								key={column.id}
								title={column.title}
								description={column.description}
								slug={column.slug}
								cover={column.cover}
								color={column.color}
								postCount={column.postCount}
							/>
						))}
					</div>
				</section>

				{/* Submissions Section */}
				<section aria-labelledby="submissions-heading" className="relative">
					{/* Background decoration */}
					<div
						className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 to-transparent dark:from-zinc-800/20 dark:to-transparent rounded-3xl"
						aria-hidden="true"
					/>

					{/* Content */}
					<div className="relative border border-zinc-100 dark:border-zinc-700/40 rounded-3xl p-8 md:p-12">
						<div className="max-w-2xl mx-auto text-center">
							{/* Icon */}
							<div
								className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 mb-6"
								aria-hidden="true"
							>
								<svg
									className="w-8 h-8 text-blue-600 dark:text-blue-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
									/>
								</svg>
							</div>

							{/* Header */}
							<h2
								id="submissions-heading"
								className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4"
							>
								投稿区
							</h2>
							<p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
								欢迎分享你的故事、创作或任何想法。优质内容将会被收录到网友投稿专栏，与更多人分享你的思考。
							</p>

							{/* Features */}
							<div
								className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
								role="list"
								aria-label="投稿特色功能"
							>
								<div
									className="flex items-center justify-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400"
									role="listitem"
								>
									<svg
										className="w-4 h-4 text-green-500"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
									<span>原创内容</span>
								</div>
								<div
									className="flex items-center justify-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400"
									role="listitem"
								>
									<svg
										className="w-4 h-4 text-blue-500"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd"
										/>
									</svg>
									<span>质量优先</span>
								</div>
								<div
									className="flex items-center justify-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400"
									role="listitem"
								>
									<svg
										className="w-4 h-4 text-purple-500"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
									</svg>
									<span>社区共享</span>
								</div>
							</div>
						</div>

						{/* Comments Section */}
						<div className="border-t border-zinc-100 dark:border-zinc-700/40 pt-8">
							<Suspense
								fallback={
									<div className="flex items-center justify-center py-8">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-600 dark:border-zinc-400"></div>
										<span className="ml-3 text-sm text-zinc-600 dark:text-zinc-400">
											加载评论中...
										</span>
									</div>
								}
							>
								<Comments showHeader={false} path="/notes" />
							</Suspense>
						</div>
					</div>
				</section>
			</main>
		</Container>
	);
}
