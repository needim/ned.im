/* Creating common PostContent component for both Geek and Notes posts */

"use client";

import { IconArrowLeft, IconDownload, IconFile } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { formattedDate } from "@/lib/utils";
import dynamic from "next/dynamic";
import { MDXContent } from '@/components/mdx-content';

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
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (post.videoUrl) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true);
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      const videoPlaceholder = document.getElementById("video-placeholder");
      if (videoPlaceholder) {
        observer.observe(videoPlaceholder);
      }
      return () => observer.disconnect();
    }
  }, [post.videoUrl]);

  if (!post) return null;

  const isExternalLink = post.attachmentUrl?.startsWith("http");
  const attachmentFileName = isExternalLink ? null : post.attachmentUrl?.split("/").pop();
  const attachmentApiUrl = attachmentFileName ? `/api/attachments/${attachmentFileName}` : post.attachmentUrl;

  return (
    <div>
      {/* Back Link */}
      <div>
        <Link href={backLink} className="no-underline inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
          <IconArrowLeft className="w-4 h-4" /> 返回
        </Link>
      </div>

      {/* Article Header */}
      <header className="not-prose mb-8">
        <h1 className="text-4xl font-bold tracking-tight mt-4">{post.title}</h1>
        <div className="mt-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formattedDate(post.date)}</time>
          {attachmentApiUrl && (
            <Link 
              href={attachmentApiUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-1 no-underline text-muted-foreground hover:text-primary transition-colors"
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

      {/* Video Section */}
      {post.videoUrl && (
        <div id="video-placeholder" className="relative aspect-video overflow-hidden rounded-lg bg-muted mb-8">
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

      {/* MDX Content */}
      <div className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none">
        {mounted && <MDXContent content={content} />}
      </div>

      {/* Comments Section */}
      <div className="mt-16">
        {mounted && <ClientSideComments />}
      </div>
    </div>
  );
} 