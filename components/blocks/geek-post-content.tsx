"use client";

import { Container } from "@/components/blocks/container";
import { Badge } from "@/components/ui/badge";
import { IconCalendar, IconArrowLeft } from "@tabler/icons-react";
import { Comments } from "@/components/blocks/comments";
import { ClientSideContent } from "@/components/blocks/client-side-content";
import Link from "next/link";
import type { ReactElement } from "react";

interface GeekPostContentProps {
  post: {
    title: string;
    date: string;
    description?: string;
    videoUrl?: string;
  };
  content: ReactElement;
  slug: string;
}

export function GeekPostContent({ post, content, slug }: GeekPostContentProps) {
  return (
    <Container>
      <div className="relative mx-auto max-w-4xl mt-16">
        <div className="mb-8">
          <Link
            href="/geek"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="mr-2 size-4" />
            返回技术分享
          </Link>
        </div>

        <article className="relative">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IconCalendar className="size-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    技术分享
                  </Badge>
                </div>
              </div>
              {post.description && (
                <p className="text-lg text-muted-foreground">{post.description}</p>
              )}
            </div>
          </header>

          {post.videoUrl && (
            <div className="aspect-video w-full mb-12">
              <iframe
                src={post.videoUrl}
                className="w-full h-full rounded-lg shadow-lg"
                title={post.title}
                allowFullScreen
              />
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            {content}
          </div>

          <div className="mt-16 pt-8 border-t">
            <Comments path={`/geek/${slug}`} />
          </div>
        </article>

        <ClientSideContent />
      </div>
    </Container>
  );
} 