"use client";

import { Container } from "@/components/blocks/container";
import { IconArrowLeft, IconDownload, IconFile } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo, useState, useCallback, useEffect } from 'react';
import { MDXContent } from '@/components/mdx-content';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { formattedDate } from "@/lib/utils";
import type { GeekMeta } from "@/types/geek";
import dynamic from 'next/dynamic';
import { Comments } from "@/components/blocks/comments";

const ClientSideComments = dynamic(
  () => import('@/components/blocks/comments').then(mod => mod.Comments),
  { ssr: false }
);

const ClientSideContent = dynamic(
  () => import('@/components/blocks/client-side-content').then(mod => mod.ClientSideContent),
  { ssr: false }
);

const ClientSideMDXContent = dynamic(
  () => import('@/components/mdx-content').then(mod => mod.MDXContent),
  { ssr: false }
);

interface GeekPostContentProps {
  post: GeekMeta;
  content: MDXRemoteSerializeResult;
  slug: string;
}

export function GeekPostContent({ post, content, slug }: GeekPostContentProps) {
  const [mounted, setMounted] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // 使用 Intersection Observer 检测视频区域是否进入视口
    if (post.videoUrl) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVideoVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      const videoPlaceholder = document.getElementById('video-placeholder');
      if (videoPlaceholder) {
        observer.observe(videoPlaceholder);
      }

      return () => observer.disconnect();
    }
  }, [post.videoUrl]);

  if (!post) {
    return null;
  }

  const isExternalLink = post.attachmentUrl?.startsWith('http');
  const attachmentFileName = isExternalLink ? null : post.attachmentUrl?.split('/').pop();
  const attachmentApiUrl = attachmentFileName ? `/api/attachments/${attachmentFileName}` : post.attachmentUrl;

  return (
    <Container>
      <div className="mx-auto max-w-4xl mt-16">
        <div className="mb-8">
          <Link href="/geek" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <IconArrowLeft className="w-4 h-4" />
            返回极客日志
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="mt-2 flex items-center gap-4">
              <time className="text-sm text-muted-foreground" dateTime={post.date}>
                {formattedDate(post.date)}
              </time>
              {attachmentApiUrl && (
                <Link
                  href={attachmentApiUrl}
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {isExternalLink ? (
                    <>
                      <IconFile className="w-4 h-4" />
                      <span>查看附件</span>
                    </>
                  ) : (
                    <>
                      <IconDownload className="w-4 h-4" />
                      <span>下载附件</span>
                    </>
                  )}
                </Link>
              )}
            </div>
            {post.description && (
              <p className="mt-4 text-muted-foreground">
                {post.description}
              </p>
            )}
          </header>

          {post.videoUrl && (
            <div id="video-placeholder" className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
              {isVideoVisible ? (
                <>
                  {isVideoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                  <iframe
                    src={post.videoUrl}
                    className="absolute inset-0 h-full w-full"
                    title={post.title}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    onLoad={() => setIsVideoLoading(false)}
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              )}
            </div>
          )}

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            {mounted && <ClientSideMDXContent content={content} />}
          </div>
        </article>

        {mounted && (
          <div className="mt-16">
            <ClientSideComments />
          </div>
        )}

        <ClientSideContent />
      </div>
    </Container>
  );
} 