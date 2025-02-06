"use client";

import { Container } from "@/components/blocks/container";
import { Badge } from "@/components/ui/badge";
import { IconCalendar, IconArrowLeft, IconPaw, IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useMemo, useState, useCallback, useEffect } from 'react';
import * as runtime from 'react/jsx-runtime';

const ClientSideComments = dynamic(
  () => import('@/components/blocks/comments').then(mod => mod.Comments),
  { ssr: false }
);

const ClientSideContent = dynamic(
  () => import('@/components/blocks/client-side-content').then(mod => mod.ClientSideContent),
  { ssr: false }
);

const MDXRemoteContent = dynamic(
  () => import('@/components/mdx-remote-content').then(mod => mod.MDXRemoteContent),
  { ssr: false }
);

interface GeekPostContentProps {
  post: {
    title: string;
    date: string;
    description?: string;
    videoUrl?: string;
    attachmentUrl?: string;
  };
  content: any;
  slug: string;
}

export function GeekPostContent({ post, content, slug }: GeekPostContentProps) {
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
  const COOLDOWN_PERIOD = 2000; // 2秒冷却时间

  const handleDownload = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const currentTime = Date.now();
    
    // 如果在冷却期间，阻止下载
    if (currentTime - lastClickTime < COOLDOWN_PERIOD) {
      e.preventDefault();
      return;
    }

    // 更新最后点击时间
    setLastClickTime(currentTime);
    
    // 临时禁用按钮
    setIsDownloadDisabled(true);
    
    // 2秒后重新启用按钮
    setTimeout(() => {
      setIsDownloadDisabled(false);
    }, COOLDOWN_PERIOD);
  }, [lastClickTime]);

  const handleDownloadError = (e: React.SyntheticEvent<HTMLAnchorElement, Event>) => {
    // 如果文件不存在，阻止默认行为并可以选择显示一个提示
    console.error('Download failed:', e);
  };

  return (
    <Container>
      <div className="mx-auto max-w-4xl mt-16">
        <div className="mb-8">
          <Link href="/geek" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <IconArrowLeft className="w-4 h-4 mr-2" />
            返回技术分享
          </Link>
        </div>

        <article className="relative">
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 cursor-default"
                  >
                    技术分享
                  </Badge>
                  {typeof post.attachmentUrl === 'string' && post.attachmentUrl.trim() !== '' && (
                    <Link 
                      href={post.attachmentUrl}
                      onClick={handleDownload}
                      className={`inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-full text-sm font-medium transition-colors px-3 py-1 ${
                        isDownloadDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
                      }`}
                      onError={handleDownloadError}
                    >
                      <IconDownload className="w-3.5 h-3.5" />
                      资源
                    </Link>
                  )}
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

          <MDXRemoteContent content={content} />

          <div className="mt-16 pt-8 border-t">
            <ClientSideComments path={`/geek/${slug}`} />
          </div>
        </article>

        <ClientSideContent />
      </div>
    </Container>
  );
} 