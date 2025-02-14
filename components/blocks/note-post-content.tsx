"use client";

import Link from "next/link";
import { formattedDate } from "@/lib/utils";
import { IconArrowLeft } from "@tabler/icons-react";
import dynamic from 'next/dynamic';
import { MDXContent } from '@/components/mdx-content';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

const ArticleLayout = dynamic(() => import("@/app/(website)/article-layout"), { ssr: true });
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
    description: string;
    slug: string;
  };
  columnSlug: string;
  postSlug: string;
}

export function NotePostContent({ post, columnData, columnSlug }: NotePostContentProps) {
  return (
    <ArticleLayout>
      <div className="mb-8">
        <Link 
          href={`/notes/${columnSlug}`} 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" />
          返回{columnData.title}
        </Link>
      </div>

      <header className="not-prose mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{post.metadata.title}</h1>
        <div className="mt-2 text-sm text-muted-foreground">
          <time dateTime={post.metadata.date}>{formattedDate(post.metadata.date)}</time>
        </div>
        {post.metadata.description && (
          <p className="mt-4 text-muted-foreground">
            {post.metadata.description}
          </p>
        )}
        {post.metadata.tags && post.metadata.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.metadata.tags.map((tag) => (
              <span 
                key={tag}
                className="text-sm text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none">
        <MDXContent content={post.content} />
      </div>

      <div className="mt-16">
        <ClientSideComments />
      </div>
    </ArticleLayout>
  );
} 