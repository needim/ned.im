/* Creating common PostContent component for both Geek and Notes posts */

"use client";

import { IconArrowLeft, IconDownload, IconFile } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { formattedDate } from "@/lib/utils";
import dynamic from "next/dynamic";
import { MDXContent } from '@/components/mdx-content';
import VideoEmbed from '@/components/blocks/video-embed';
import { usePathname, useSearchParams } from 'next/navigation';

// Dynamic imports for MDX content and comments
const ClientSideComments = dynamic(
  () => import('@/components/blocks/comments').then(mod => mod.Comments),
  { ssr: false }
);

// Define a common PostMeta interface to represent common post fields
export interface PostMeta {
  title: string;
  date: string;
  description?: string;
  videoUrl?: string;
  biliVideoUrl?: string;
  attachmentUrl?: string;
  // Additional fields can be added if needed
}

interface PostContentProps {
  post: PostMeta;
  content: MDXRemoteSerializeResult;
  backLink: string;
}

export function PostContent({ post, content, backLink }: PostContentProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fromPath = searchParams.get('from');

  useEffect(() => {
    setMounted(true);
    const savedPosition = sessionStorage.getItem(`scrollPos-${pathname}`);
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: Number.parseInt(savedPosition, 10),
          behavior: 'instant'
        });
      }, 100);
    }

    const handleScroll = () => {
      sessionStorage.setItem(`scrollPos-${pathname}`, window.scrollY.toString());
    };

    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname]);

  if (!post) return null;

  return (
    <div className="max-w-none">
      {/* Back Link */}
      <div className="mb-8">
        <Link 
          href={fromPath || backLink} 
          className="no-underline inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" /> 返回
        </Link>
      </div>

      {/* Article Header */}
      <header className="border-b border-border/40 pb-6 mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 text-muted-foreground">
          <time dateTime={post.date} className="text-sm">{formattedDate(post.date)}</time>
          {post.attachmentUrl && (
            <Link 
              href={post.attachmentUrl.startsWith("http") ? post.attachmentUrl : `/api/attachments/${post.attachmentUrl.split("/").pop()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm no-underline text-muted-foreground hover:text-primary transition-colors"
            >
              {post.attachmentUrl.startsWith("http") ? (
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
          <p className="mt-6 text-lg text-muted-foreground/90 font-normal leading-relaxed">
            {post.description}
          </p>
        )}
      </header>

      {/* Video Section */}
      {post.videoUrl && post.biliVideoUrl && (
        <div className="mb-10 rounded-lg overflow-hidden border border-border/40 bg-card/50">
          <VideoEmbed 
            youtubeUrl={post.videoUrl}
            biliUrl={post.biliVideoUrl}
          />
        </div>
      )}

      {/* MDX Content */}
      <article className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none
        prose-headings:border-b 
        prose-headings:border-border/40 
        prose-headings:pb-2 
        prose-headings:mb-4
        prose-h1:text-4xl
        prose-h1:border-none
        prose-h2:text-3xl
        prose-h2:mt-8
        prose-h2:mb-4
        prose-h2:border-none
        prose-h3:text-2xl
        prose-h3:mt-6
        prose-h3:mb-3
        prose-h3:border-none
        prose-h4:text-xl
        prose-h4:mt-4
        prose-h4:mb-2
        prose-h4:border-none
        prose-p:text-base 
        prose-p:leading-7
        prose-p:my-3
        prose-ul:my-4
        prose-ol:my-4
        prose-li:my-1
        prose-blockquote:border-l-4
        prose-blockquote:border-border/40
        prose-blockquote:pl-4
        prose-blockquote:pr-4
        prose-blockquote:py-2
        prose-blockquote:my-4
        prose-blockquote:bg-muted/20
        prose-blockquote:rounded-md
        prose-blockquote:text-muted-foreground
        prose-blockquote:not-italic
        prose-blockquote:[&>*]:my-0
        prose-blockquote:mx-0
        [&>*:first-child]:mt-0
        [&>*:last-child]:mb-0
        prose-img:rounded-xl
        prose-img:border-2
        prose-img:border-border/40
        prose-img:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]
        dark:prose-img:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3)]
        prose-img:bg-gradient-to-br
        prose-img:from-card/80
        prose-img:to-card/50
        dark:prose-img:from-card/20
        dark:prose-img:to-card/10
        prose-img:transition-all 
        prose-img:duration-300
        hover:prose-img:translate-y-[-2px]
        hover:prose-img:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.15)]
        dark:hover:prose-img:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)]
        prose-img:backdrop-blur-sm
        prose-img:ring-1
        prose-img:ring-border/50
        prose-img:ring-offset-2
        prose-img:ring-offset-background
        prose-img:my-4
        prose-img:p-0.5
        prose-a:text-primary
        prose-a:no-underline
        prose-a:font-medium
        hover:prose-a:text-primary/90
        [&_.link-button]:!text-white
        [&_.link-button]:!no-underline
        [&_.link-button]:!font-medium
        [&_.link-button]:!bg-zinc-900
        [&_.link-button]:dark:!bg-zinc-800
        [&_.link-button]:hover:!bg-zinc-800
        [&_.link-button]:dark:hover:!bg-zinc-700
        prose-strong:text-foreground
        prose-code:text-foreground/90
        prose-code:bg-muted/40
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:rounded-md
        prose-code:before:content-none
        prose-code:after:content-none
        prose-code:font-normal
        prose-pre:bg-zinc-900
        prose-pre:border
        prose-pre:border-border/40
        prose-pre:rounded-lg
        [&_pre>code]:!bg-transparent
        [&_pre>code]:!text-zinc-50
        [&_pre>code]:!p-0
        [&_pre>code]:!text-[14px]
        [&_pre>code]:leading-relaxed
        [&_pre]:!p-4
        [&_pre]:!my-6
        [&_pre]:backdrop-blur-sm
        [&_pre]:bg-opacity-90
        [&_pre_.hljs-keyword]:text-blue-300
        [&_pre_.hljs-built_in]:text-blue-200
        [&_pre_.hljs-type]:text-emerald-300
        [&_pre_.hljs-string]:text-amber-300
        [&_pre_.hljs-number]:text-pink-300
        [&_pre_.hljs-comment]:text-zinc-500
        [&_pre_.hljs-operator]:text-zinc-300
        [&_pre_.hljs-punctuation]:text-zinc-400
        [&_pre_.hljs-property]:text-indigo-300
        [&_pre_.hljs-function]:text-violet-300
      ">
        <div className="group">
          {mounted && <MDXContent content={content} />}
        </div>
      </article>

      {/* Comments Section */}
      <div className="mt-20 border-t border-border/40 pt-10">
        {mounted && <ClientSideComments />}
      </div>
    </div>
  );
} 