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

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {post.videoUrl && post.biliVideoUrl && (
        <div className="mb-8">
          <VideoEmbed 
            youtubeUrl={post.videoUrl}
            biliUrl={post.biliVideoUrl}
          />
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