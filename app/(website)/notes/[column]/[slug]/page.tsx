import { Container } from "@/components/blocks/container";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { columns } from "@/config/columns";

async function getPost(column: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/notes', column, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    if (data.column !== column) {
      return null;
    }

    return {
      metadata: {
        title: data.title as string,
        date: data.date as string,
        description: data.description as string | undefined,
        tags: data.tags as string[] | undefined,
        column: data.column as string,
      },
      content
    };
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return null;
  }
}

export default async function PostPage({ params }: { params: { column: string; slug: string } }) {
  const columnSlug = params.column;
  const postSlug = params.slug;
  
  const post = await getPost(columnSlug, postSlug);
  const column = columns.find(col => col.slug === columnSlug);

  if (!post || !column) {
    notFound();
  }

  return (
    <Container>
      <article className="mx-auto max-w-4xl mt-16 animate-fade-up">
        <div className="mb-8">
          <Link href={`/notes/${columnSlug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← 返回{column.title}
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">{post.metadata.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.metadata.date}>{post.metadata.date}</time>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex gap-2">
                {post.metadata.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </Container>
  );
} 