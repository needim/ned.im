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

// 获取所有可能的路径参数
export async function generateStaticParams() {
  const posts = [];
  
  // 遍历所有专栏
  for (const column of columns) {
    const columnPath = path.join(process.cwd(), 'content/notes', column.slug);
    try {
      const files = await fs.readdir(columnPath);
      
      // 获取所有 .mdx 文件
      const mdxFiles = files.filter(file => file.endsWith('.mdx'));
      
      // 为每个文件生成参数
      for (const file of mdxFiles) {
        posts.push({
          column: column.slug,
          slug: file.replace(/\.mdx$/, '')
        });
      }
    } catch (error) {
      console.error(`Error reading directory ${columnPath}:`, error);
    }
  }
  
  return posts;
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

// 使用 ISR 而不是强制动态渲染
export const revalidate = 3600; // 1小时重新验证一次

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