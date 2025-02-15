import VideoEmbed from '@/components/blocks/video-embed';

interface MDXLayoutProps {
  children: React.ReactNode;
  frontmatter: {
    videoUrl?: string;
    biliVideoUrl?: string;
    // 文章页面特有的字段
    title?: string;
    date?: string;
    description?: string;
    [key: string]: unknown;
  };
}

export default function MDXLayout({ children, frontmatter }: MDXLayoutProps) {
  // 检查是否是文章页面（通过检查文章特有的frontmatter字段）
  const isArticlePage = Boolean(
    frontmatter.title && 
    frontmatter.date && 
    frontmatter.description
  );

  return (
    <>
      {/* 只在非文章页面处理视频嵌入 */}
      {!isArticlePage && frontmatter.videoUrl && (
        <VideoEmbed 
          youtubeUrl={frontmatter.videoUrl}
          biliUrl={frontmatter.biliVideoUrl || ""}
        />
      )}
      <main>{children}</main>
    </>
  );
} 