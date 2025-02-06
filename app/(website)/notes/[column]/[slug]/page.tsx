import { Container } from "@/components/blocks/container";
import { Comments } from "@/components/blocks/comments";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { columns } from "@/config/columns";
import { TableOfContents } from "@/components/blocks/table-of-contents";
import { TextSelectionPopover } from "@/components/blocks/text-selection-popover";
import { MDXRemoteContent } from "@/components/mdx-remote-content";
import { formattedDate } from "@/lib/utils";
import { compileMDX } from "@/lib/mdx";

interface Params {
  column: string;
  slug: string;
}

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

async function getPost(column: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/notes', column, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    if (data.column !== column) {
      return null;
    }

    const mdxSource = await compileMDX(content);

    return {
      metadata: {
        title: data.title as string,
        date: data.date as string,
        description: data.description as string | undefined,
        tags: data.tags as string[] | undefined,
        column: data.column as string,
      },
      content: mdxSource
    };
  } catch (error) {
    console.error(`Error reading file: ${error}`);
    return null;
  }
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await params;
  const { column: columnParam, slug: slugParam } = resolvedParams;
  const columnSlug = columnParam;
  const postSlug = slugParam;
  
  const post = await getPost(columnSlug, postSlug);
  const columnData = columns.find(col => col.slug === columnSlug);

  if (!post || !columnData) {
    notFound();
  }

  return (
    <Container>
      <div className="relative mx-auto max-w-4xl mt-16">
        <div className="mb-8">
          <Link href={`/notes/${columnSlug}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <span className="mr-2">←</span>
            返回{columnData.title}
          </Link>
        </div>

        <article className="relative">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">{post.metadata.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.metadata.date}>{formattedDate(post.metadata.date)}</time>
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.metadata.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none">
            <MDXRemoteContent content={post.content} />
          </div>

          <div className="mt-16 pt-8 border-t">
            <Comments path={`/notes/${columnSlug}/${postSlug}`} />
          </div>
        </article>

        <TableOfContents />
        <TextSelectionPopover />
      </div>
    </Container>
  );
} 