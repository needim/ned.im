import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { columns } from "@/config/columns";
import { compileMarkdown } from "@/lib/mdx";
import { NotePostContent } from "@/components/blocks/note-post-content";

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

    const mdxSource = await compileMarkdown(content);

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

// 强制动态渲染
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    <NotePostContent
      post={post}
      columnData={columnData}
      columnSlug={columnSlug}
      postSlug={postSlug}
    />
  );
}