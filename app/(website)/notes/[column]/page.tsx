import { Container } from "@/components/blocks/container";
import Link from "next/link";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { columns } from "@/config/columns";
import { notFound } from "next/navigation";
import { formattedDate } from "@/lib/utils";
import { unstable_noStore } from 'next/cache';

interface Post {
  slug: string;
  metadata: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    column: string;
  };
}

interface Params {
  column: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

async function getColumnPosts(columnSlug: string): Promise<Post[]> {
  // 禁用缓存
  unstable_noStore();
  
  const postsDirectory = path.join(process.cwd(), 'content/notes', columnSlug);
  
  try {
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
              column: data.column as string,
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
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
}

export default async function ColumnPage({ 
  params 
}: { 
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  // 禁用缓存
  unstable_noStore();
  
  const resolvedParams = await params;
  const columnSlug = resolvedParams.column;
  const columnData = columns.find(col => col.slug === columnSlug);
  
  if (!columnData) {
    notFound();
  }

  const posts = await getColumnPosts(columnSlug);

  return (
    <Container>
      <div className="mx-auto max-w-4xl mt-16">
        <div className="mb-12">
          <Link href="/notes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← 返回专栏列表
          </Link>
          <h1 className="text-4xl font-bold tracking-tight mt-4">{columnData.title}</h1>
          <p className="text-muted-foreground mt-2">{columnData.description}</p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group relative">
              <div className="relative">
                <h2 className="text-2xl font-semibold tracking-tight">
                  <Link href={`/notes/${columnSlug}/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.metadata.title}
                  </Link>
                </h2>
                <div className="mt-2 text-sm text-muted-foreground">
                  <time dateTime={post.metadata.date}>{formattedDate(post.metadata.date)}</time>
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

          {posts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无文章
            </div>
          )}
        </div>
      </div>
    </Container>
  );
} 