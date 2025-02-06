"use client";

import Link from "next/link";
import { Container } from "@/components/blocks/container";
import dynamic from 'next/dynamic';
import { formattedDate } from "@/lib/utils";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

const TableOfContents = dynamic(
  () => import('@/components/blocks/table-of-contents').then(mod => mod.TableOfContents),
  { ssr: false }
);
const TextSelectionPopover = dynamic(
  () => import('@/components/blocks/text-selection-popover').then(mod => mod.TextSelectionPopover),
  { ssr: false }
);
const MDXRemoteContent = dynamic(
  () => import('@/components/mdx-remote-content').then(mod => mod.MDXRemoteContent),
  { ssr: false }
);
const ClientSideComments = dynamic(
  () => import('@/components/blocks/comments').then(mod => mod.Comments),
  { ssr: false }
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
    slug: string;
  };
  columnSlug: string;
  postSlug: string;
}

export function NotePostContent({ post, columnData, columnSlug, postSlug }: NotePostContentProps) {
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
            <MDXRemoteContent 
              content={post.content} 
            />
          </div>

          <div className="mt-16 pt-8 border-t">
            <ClientSideComments path={`/notes/${columnSlug}/${postSlug}`} />
          </div>
        </article>

        <TableOfContents />
        <TextSelectionPopover />
      </div>
    </Container>
  );
} 