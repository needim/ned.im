import { Container } from "@/components/blocks/container";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { Comments } from "@/components/blocks/comments";
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface NotePageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function NotePage({ params, searchParams }: NotePageProps) {
  try {
    const slug = await params.slug;
    const filePath = path.join(process.cwd(), 'content/notes', `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data: metadata, content } = matter(fileContent);

    return (
      <Container>
        <div className="mx-auto max-w-2xl mt-16">
          <div className="mb-8">
            <Link 
              href="/notes" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <IconArrowLeft className="w-4 h-4" />
              返回文章列表
            </Link>
            <h1 className="text-4xl font-bold tracking-tight">{metadata.title}</h1>
            <div className="mt-2 text-sm text-muted-foreground">
              <time dateTime={metadata.date}>{metadata.date}</time>
            </div>
          </div>
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote source={content} />
          </article>
          <Comments path={`/notes/${slug}`} />
        </div>
      </Container>
    );
  } catch (error) {
    console.error('Error loading note:', error);
    notFound();
  }
} 