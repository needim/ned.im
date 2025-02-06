import { Container } from "@/components/blocks/container";
import { BookCard } from "@/components/blocks/book-card";
import { columns } from "@/config/columns";
import { Comments } from "@/components/blocks/comments";

export default function NotesPage() {
	return (
		<Container>
			<div className="mx-auto max-w-4xl mt-16 animate-fade-up space-y-16">
				<div>
					<h1 className="text-4xl font-bold tracking-tight mb-4">专栏</h1>
					<p className="text-muted-foreground mb-12">选择一个专栏以浏览相关文章</p>
					
					{/* Bookshelf */}
					<div className="relative">
						{/* Bookshelf Shadow */}
						<div className="absolute -bottom-8 left-0 right-0 h-4 bg-gradient-to-b from-background to-transparent" />
						
						{/* Books Grid */}
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center pb-8">
							{columns.map((column) => (
								<BookCard
									key={column.id}
									title={column.title}
									description={column.description}
									slug={column.slug}
									cover={column.cover}
									color={column.color}
								/>
							))}
						</div>
						
						{/* Bookshelf */}
						<div className="relative">
							<div className="h-2 bg-muted rounded-full mx-4" />
							<div className="absolute inset-x-0 h-8 -bottom-8 bg-gradient-to-b from-muted/20 to-transparent" />
							{/* Bookshelf Support */}
							<div className="absolute -bottom-6 left-8 w-2 h-8 bg-muted/50 rounded-sm transform -skew-x-12" />
							<div className="absolute -bottom-6 right-8 w-2 h-8 bg-muted/50 rounded-sm transform skew-x-12" />
						</div>
					</div>
				</div>

				{/* Submissions Section */}
				<div className="border-t pt-16">
					<div className="max-w-2xl mx-auto">
						<h2 className="text-2xl font-bold tracking-tight mb-4">投稿区</h2>
						<p className="text-muted-foreground mb-8">
							欢迎分享你的故事、创作或任何想法。优质内容将会被收录到网友投稿专栏。
						</p>
						<Comments showHeader={false} path="/notes" />
					</div>
				</div>
			</div>
		</Container>
	);
}
