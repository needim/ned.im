import { notFound } from "next/navigation";
import { getGeekPostBySlug } from "@/lib/geek";
import { PostContent } from "@/components/blocks/post-content";
import type { Metadata } from "next";
import { compileMarkdown } from "@/lib/mdx";
import ArticleLayout from "@/app/(website)/article-layout";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function GeekPostPage({ params, searchParams }: PageProps) {
  // 等待 params 解析完成
  const resolvedParams = await params;
  // 将路径数组转换为路径字符串
  const slug = resolvedParams.slug.join('/');

  if (!slug) {
    notFound();
  }

  const result = await getGeekPostBySlug(slug);

  if (!result) {
    notFound();
  }

  const { meta: post, content } = result;
  const compiledContent = await compileMarkdown(content);

  return (
    <ArticleLayout>
      <PostContent 
        post={post} 
        content={compiledContent} 
        backLink="/geek" 
      />
    </ArticleLayout>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // 等待 params 解析完成
  const resolvedParams = await params;
  const slug = resolvedParams.slug.join('/');
  
  if (!slug) {
    return {
      title: 'Not Found | Geek',
      description: 'The page you are looking for does not exist.',
    };
  }

  const post = await getGeekPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Not Found | Geek',
      description: 'The page you are looking for does not exist.',
    };
  }

  return {
    title: `${post.meta.title} | Geek`,
    description: post.meta.description,
  };
} 